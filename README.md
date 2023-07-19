
## Project in preparation
# Project Adding Receipts (Angular v16) + Optical Character Recognition (OCR - Cloud Vision API)


## Installation of the environment
- cd app-receipt
- `npm cache clean --force`
- `npm install` or `npm i`

## before running the server connecting to the database you must install 
- `npm install msnodesqlv8, jsonwebtoken, express, cors, @google-cloud/vision, express-fileupload` 
or 
- `npm i msnodesqlv8, jsonwebtoken, express, cors, @google-cloud/vision, express-fileupload`

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
      The statement returns a list of zones

      `gcloud compute zones list`
      
       The statement returns a list of regions

      `gcloud compute regions list`

      `gcloud compute project-info add-metadata --metadata google-compute-default-region=europe-central2,google-compute-default-zone=europe-central2-a`

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

5. Grant roles to your Google Account. Run the following command once for each of the following IAM roles: roles/storage.objectViewer

   `gcloud projects add-iam-policy-binding PROJECT_ID --member="user:EMAIL_ADDRESS" --role=ROLE`

    ROLE - `--role=roles/storage.objectViewer`