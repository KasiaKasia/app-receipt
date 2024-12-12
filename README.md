
## Project in preparation
# Project Adding Receipts (Angular v16) + Optical Character Recognition (OCR - Cloud Vision API)

This project was generated with Angular CLI version 18.2.5.

## Installation of the environment
- cd app-receipt
- `npm cache clean --force`
- `npm install` or `npm i`

## Before running the server connecting to the database you must install 
- `npm install msnodesqlv8, jsonwebtoken, express, cors, @google-cloud/vision, express-fileupload, fs, cookie-parser` 

   or 
- `npm i msnodesqlv8, jsonwebtoken, express, cors, @google-cloud/vision, express-fileupload, fs, cookie-parser`

## Key Generation
In the directory: `app-receipt\src\app\environments`, execute the following commands:  
``` 
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048  
openssl rsa -pubout -in private.key -out public.key  
```  
These commands will generate two files: `private.key` and `public.key`.

## Cookies
In my opinion, the access token (`accessToken`) and the refresh token (`refreshToken`) should be stored in cookies. This is because setting the `httpOnly` option to `true` when creating a cookie prevents the content of the cookie from being read via JavaScript (`document.cookie`).


## Run the server connecting to the MS SQL Server database
- `node server`

## Angular Material configuration
- In the angular.json file, you need to add an attribute containing the path to the file `theme.scss`
```
"architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
          ...
            "styles": [
                `"src/styles.scss",
                `"src/app/shared/scss/material/theme.scss"
            ],
            "scripts": []
          },
 ...
```




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
 
## Before you can use the Cloud Vision API, you must enable it for your project:

1. To run the commands on this application (local), set up the gcloud CLI by doing following these steps:

  - Install the gcloud CLI. (https://cloud.google.com/sdk/docs/install)
  - Initialize the gcloud CLI. (https://cloud.google.com/sdk/docs/initializing)

    - Run command in console `gcloud init`
    - Set the region and zone parameters.

      `gcloud compute project-info add-metadata --metadata google-compute-default-region=europe-central2,google-compute-default-zone=europe-central2-a`

      The statement returns a list of zones:

      `gcloud compute zones list`

       The statement returns a list of regions:

      `gcloud compute regions list`

      

2. Create or select a Google Cloud project.

  - Create:
    - Log in to https://console.cloud.google.com/
    - In the upper left menu, expand the list of projects
    - Click the New Project button
    - Fill out the form and click Create

  - Select the Google Cloud project that you created:

    ```gcloud config set project PROJECT_ID ```

    `PROJECT_ID` - PROJECT_ID can be read from the Settings Menu

3. Enable the Cloud Vision API:

   `gcloud services enable vision.googleapis.com`

4. Create local authentication credentials for your Google Account:

   `gcloud auth application-default login`
Service Usage API
   https://console.cloud.google.com/apis/library/serviceusage.googleapis.com?project=app-receipt
   Enable

ERROR: (gcloud.auth.application-default.login) PERMISSION_DENIED: Service Usage API has not been used in project 443282818645 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/serviceusage.googleapis.com/overview?project=443282818645 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.

Enable a billing account for the project
 - Billing account for project '443282818645' is not found. Billing must be enabled for activation of service(s) 'compute.googleapis.com,compute.googleapis.com,compute.googleapis.com' to proceed.

5. Grant roles to your Google Account. Run the following command once for each of the following IAM roles: roles/storage.objectViewer

   `gcloud projects add-iam-policy-binding PROJECT_ID --member="user:EMAIL_ADDRESS" --role=ROLE`

    ROLE - `--role=roles/storage.objectViewer`


output:

    forumzxc123@cloudshell:~ (443282818645)$ gcloud projects add-iam-policy-binding 443282818645 --member="user:forumzxc123@gmail.com" --role=roles/storage.objectViewer
Updated IAM policy for project [443282818645].
bindings:
- members:
  - user:Forumzxc123@gmail.com
  role: roles/owner
- members:
  - user:Forumzxc123@gmail.com
  role: roles/storage.objectViewer
etag: BwYZDNvRons=
version: 1
forumzxc123@cloudshell:~ (443282818645)$ 

6. Enable a billing account for the project.

  Select Payments in the left menu. If the message appears:
  "There is no billing account for this project"
  click the "Connect billing account" button


## Database schema


| table name | column | type |
| :---       | :---  |:--- | 
| `Image`  | id | int
| `Image`  | name | varchar(max)
| `Image`  | base64 | varchar(max)


| table name | column | type |
| :---       | :---  |:--- | 
| `Product`  | id | int
| `Product`  | name | varchar(max)
| `Product`  | quantity | int
| `Product`  | price | money
| `Product`  | totalPrice | money
| `Product`  | receiptId | int


| table name | column | type |
| :---       | :---  |:--- | 
| `Receipt`  | id | int
| `Receipt`  | storeName | varchar(max)
| `Receipt`  | dateOfPurchase | date
| `Receipt`  | NIP | varchar(max)
| `Receipt`  | totalPrice | money
| `Receipt`  | userId | int
| `Receipt`  | imageId | int


| table name | column | type |
| :---      | :---  |:--- | 
| `Address` | id | int
| `Address` | street | varchar(max)
| `Address` | houseNumber | varchar(max)
| `Address` | city | varchar(max) 


| table name | column | type |
| :---   | :---  |:--- | 
| `User` | id | int
| `User` | username |varchar(max)
| `User` | password | varchar(max)
| `User` | description | varchar(max) 
| `User` | email | varchar(max) 
| `User` | type | varchar(max) 
| `User` | address_id | int
