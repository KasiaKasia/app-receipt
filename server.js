const sql = require('msnodesqlv8');
var express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var app = express();
var cookieParser = require('cookie-parser');
const vision = require('@google-cloud/vision');
const fileUpload = require('express-fileupload');
const connectionString = "server=DESKTOP-561O5CC\\MSSQLSERVER3;Database=database;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const privateKey = fs.readFileSync('./src/app/environments/private.key', 'utf8');
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200', // lub '*', ale to mniej bezpieczne. Addres forntend
    credentials: true, // Wymagane dla ciasteczek
  }));
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '150mb', extended: true}));
app.use(express.json());

app.use(fileUpload());

app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No files were uploaded',
        });
    } else if (req.files) {
        const fileName = req.files.fileDate.name;

        try {
            let objectDetectedTexts$ = detectText(req.files.fileDate.data)
            const filrName$ = Promise.resolve(fileName);
            Promise.all([filrName$, objectDetectedTexts$]).then((values) => {

                return res.status(200).json({
                    success: true,
                    message: 'The file has been uploaded ' + values[0],
                    respons: values[1],
                    data: req.files.fileDate.data
                });
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error detecting text',
                error: error.message
            });
        }
    }
});

async function detectText(fileName) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(fileName);
 //     const detections = result[0]['textAnnotations'];
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
    const queryInnerleft = "SELECT * FROM [database].[dbo].[User] u "
        + "WHERE u.username ='" + req.body.username + "' AND u.password = '" + req.body.password + "'";

    sql.query(connectionString, queryInnerleft, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: 'Error processing request ' + err,
                respons: user
            });
        } if (!user.length) {
            return res.status(401).json({
                success: false,
                code: 401,
                message: 'Invalid username or password.',
                respons: user
            });
        } else if (user.length) {
            const userDataPayload = {
                userid: user[0]?.id,
                username: user[0]?.username,
                password: user[0]?.password,
                description: user[0]?.description,
                email: user[0]?.email,
                type: user[0]?.type,
                address_id: user[0]?.address_id,
            }
            const accessToken = jwt.sign(userDataPayload, privateKey, { algorithm: 'RS256', expiresIn: '1m' }); //  60 seconds = 1 minute
            const refreshToken = jwt.sign(userDataPayload, privateKey, { algorithm: 'RS256', expiresIn: '2m' });            
           
            jwt.verify(accessToken, privateKey, (err , decoded ) => {
                if (err) {
                    console.error('Access Token verification failed:', err);
                } else {
                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'none',
                        maxAge:(decoded.exp * 1000) - Date.now()
                    });
                }
            });
            jwt.verify(refreshToken, privateKey, (err, decoded ) => {
                if (err) {
                    console.error('Refresh Token verification failed:', err);
                } else {
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true, // niedostępne dla JS (ogranicza ataki XSS) Wskazuje przeglądarce, że ciasteczko nie może być dostępne przez JavaScript.
                        secure: false, // Zmień na true, jeśli używasz HTTPS. Ciasteczka powinny być przesyłane wyłącznie przez szyfrowane połączenia (HTTPS).
                        sameSite: 'none', // przeglądarka dołączy ciasteczko jedynie do żądań pochodzących i kierowanych do tej samej strony, co strona, z której pochodzi ciasteczko.
                        maxAge: (decoded.exp * 1000) - Date.now()
                    });
                }
              });
            return res.status(200).json({
                success: true,
                code: 200,
                message: 'Login was successful.',
                respons: userDataPayload                
            });
        }
    });
});

app.post('/register', function (req, res) {
    const queryInnerleft = "INSERT INTO [database].[dbo].[User] ([id], [username], [password], [description], [email], [type], [address_id]) VALUES "
        + " ((SELECT max([id])+1 from [database].[dbo].[User]), '" + req.body.username + "' , '" + req.body.password + "', '', '" + req.body.email + "', '" + req.body.type + "', 0)";

      
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

app.get('/receipt/list-of-receipts/:id', (req, res) => {

    const queryInnerleft = "SELECT r.[storeName], r.[dateOfPurchase], r.[userId], r.[NIP], r.[totalPrice], "
        + "r.[id], p.[name], p.[price], p.[quantity], p.[totalPrice] as productTotalPrice, p.[receiptId], "
        + "i.[name] as nameImage, i.[base64] "
        + "FROM [database].[dbo].[Receipt] as r "
        + "right JOIN [database].[dbo].[Product] as p ON p.[receiptId]= r.id "
        + "right JOIN [database].[dbo].[Image] as i ON i.[id]= r.[imageId] "
        + "where r.[userId]  = '" + req.params.id + "'";

    sql.query(connectionString, queryInnerleft, (err, rows) => {

        if (err) {
            return res.status(400).json(err);
        } else {
            return res.status(200).json({
                success: true,
                message: 'The receipt list has been geted',
                respons: rows
            });
        }
    });
})


app.put('/receipt/add-receipt-image/:id', (req, res) => {
    const queryInsertImage = `
        INSERT INTO [database].[dbo].[Image] ([id], [name], [base64]) 
        VALUES (
            (SELECT MAX([id]) + 1 FROM [database].[dbo].[Image]), 
            '${req.body.image.name}', 
            '${req.body.image.base64}'
        )`;

    sql.query(connectionString, queryInsertImage, (err, rows) => {
        if (res.headersSent) { return; }
        if (err) {
            return res.status(400).json(err);
        } else {
            return res.status(200).json({rows});
        }
    });
});

app.put('/receipt/add-receipt/:id', (req, res, next) => {

    const queryInsertReceipt = "INSERT INTO [database].[dbo].[Receipt] ([id], [storeName], [dateOfPurchase], [totalPrice], [userId], [NIP], [imageId]) VALUES "
        + " ((SELECT max(id)+1 from [database].[dbo].[Receipt]), '" + req.body.shopName + "' , '" + req.body.dateOfPurchase + "', " + Number(req.body.totalPrice) + " ," + Number(req.params.id) + ",'" + req.body.nip + "', (SELECT max([id]) from [database].[dbo].[Image] where [name] ='" + req.body.image.name + "' )) ";

    let listProductsForReceipt = '';
    req.body.listProducts.forEach((value) => {

        let queryInsertProduct = " INSERT INTO [database].[dbo].[Product] ([id], [name], [quantity], [price], [totalPrice], [receiptId]) VALUES "
            + "( (SELECT max(id)+1 from [database].[dbo].[Product]), '" + value.productName + "' , " + Number(value.quantity) + ", " + Number(value.price) + " ," + Number(value.totalPrice) + ", (SELECT max(id)  from [database].[dbo].[Receipt] where [NIP] = '" + req.body.nip + "') ) ";
        listProductsForReceipt += queryInsertProduct;
    })
    let queryInsertReceiptAndListProduct = queryInsertReceipt + listProductsForReceipt;

    sql.query(connectionString, queryInsertReceiptAndListProduct, function (err, rows, fields) {
        if (res.headersSent) {   return; }
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error processing request ' + err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'The receipt has been added to the database',
                respons: rows
            });
        }
    });
})
 
var server = app.listen(5001, function () {
    console.log('Server is running...');
})
