const sql = require('msnodesqlv8');
var express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
var app = express();
const vision = require('@google-cloud/vision');
const fileUpload = require('express-fileupload');
const connectionString = "server=DESKTOP-561O5CC\\MSSQLSERVER3;Database=database;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(fileUpload());

app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No files were uploaded',
        });
    } else if (req.files) {
        const fileName = req.files.thumbnail.name;
        let objectDetectedTexts$ = detectText(req.files.thumbnail.data)
        const filrName$ = Promise.resolve(fileName);

        Promise.all([filrName$, objectDetectedTexts$]).then((values) => {
            return res.status(200).json({
                success: true,
                message: 'The file has been uploaded ' + values[0],
                respons: values[1]
            });
        });
    }
});

async function detectText(fileName) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    let fileObjectCopy = [];
    let fileObject = [];
    detections.forEach(text => fileObjectCopy.push(text.boundingPoly.vertices));
    detections.forEach((hintBounds, hintIdx) => {
        fileObjectCopy.forEach((value, idx) => {
            if (hintIdx === idx) {
                fileObject.push({
                    id: hintIdx,
                    description: hintBounds.description,
                    vertices: [...value]
                })
            }
        })
    });
    return fileObject;
}

app.post('/login', function (req, res) {

    const queryInnerleft = "SELECT * FROM [database].[dbo].[User] u ";
    + "WHERE u.username ='" + req.body.username + "' AND u.password = '" + req.body.password + "'";

    sql.query(connectionString, queryInnerleft, (err, user) => {

        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error processing request ' + err,
                respons: user
            });
        } if (!user) {
            return res.status(304).json({
                success: false,
                message: 'Not Modified.',
                respons: user
            });
        } else if (user) {

            const token = jwt.sign({
                data: user
            }, 'secret', { expiresIn: 60 * 60 });
            const copyUser = {
                userid: user[0]?.id,
                username: user[0]?.username,
                password: user[0]?.password,
                description: user[0]?.description,
                email: user[0]?.email,
                type: user[0]?.type,
                address_id: user[0]?.address_id,
            }

            return res.status(200).json({
                success: true,
                message: 'Login was successful.',
                respons: copyUser,
                token: token
            });
        }
    });
});

app.post('/register', function (req, res) {
    const queryInnerleft = "INSERT INTO [database].[dbo].[User] ([id], [username], [password], [description], [email], [type], [address_id]) VALUES "
        + " ((SELECT max(id)+1 from [database].[dbo].[User]), '" + req.body.username + "' , '" + req.body.password + "', '', '" + req.body.email + "', '" + req.body.type + "', 0)";

    sql.query(connectionString, queryInnerleft, (err, user) => {

        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error processing request ' + err,
                respons: user
            });
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized.',
                respons: user
            });
        } else if (user) {

            return res.status(200).json({
                success: true,
                message: 'User created successfully, please login to access your account.',
            });
        }
    });
});

app.post('/receipt/get-list-of-receipt/:id', (req, res) => {
    // res.send(req.params);


    const queryInnerleft = "SELECT r.[storeName]"
        + ", r.[dateOfPurchase]"
        + ", r.[totalPrice]"
        + ", r.[barcode]"
        + ", r.[productId]"
        + ", r.[userId]"
        + " FROM [database].[dbo].[Receipt] as r"
        + " LEFT JOIN [database].[dbo].[Product] as p"
        + " ON p.id = r.productId "
        + " where r.[userId] = '" + req.params.id + "'";

    sql.query(connectionString, queryInnerleft, (err, rows) => {

        if (err) {
            return res.status(400).json(err);
        } else {
            return res.status(200).json(rows);
        }
    });
})

app.put('/receipt/add-receipt/:id', (req, res, next) => {

    const queryInsertReceipt = "INSERT INTO [database].[dbo].[Receipt] ([id], [storeName], [dateOfPurchase], [totalPrice], [userId], [NIP]) VALUES "
        + " ((SELECT max(id)+1 from [database].[dbo].[Receipt]), '" + req.body.shopName + "' , '" + req.body.dateOfPurchase + "', " + Number(req.body.totalPrice) + " ," + Number(req.params.id) + ",'" + req.body.nip + "'); ";
    let listProductsForReceipt = '';
    req.body.listProducts.forEach((value) => {

        let queryInsertProduct = " INSERT INTO [database].[dbo].[Product] ([id], [name], [quantity], [price], [totalPrice], [receiptId]) VALUES "
            + "( (SELECT max(id)+1 from [database].[dbo].[Product]), '" + value.productName + "' , " + Number(value.quantity) + ", " + Number(value.price) + " ," + Number(value.totalPrice) + ", (SELECT max(id)  from [database].[dbo].[Receipt] where [NIP] = '" + req.body.nip + "') ); ";
        listProductsForReceipt += queryInsertProduct;

    })

    let queryInsertReceiptAndListProduct = queryInsertReceipt + listProductsForReceipt;

    sql.query(connectionString, queryInsertReceiptAndListProduct, function (err, rows, fields) {

        if (err) {
            return res.status(400).send({
                success: false,
                message: 'Error processing request ' + err
            });

        } else {
            return res.status(200).send();
        }
    });

})

var server = app.listen(5000, function () {
    console.log('Server is running...');
});
