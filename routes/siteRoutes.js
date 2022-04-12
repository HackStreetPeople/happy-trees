const router = require('express').Router();
const UploadCsvDataToMySQL = require("../utils/csv-uploader")


module.exports = (db) => {
    // post the excel file to the database
    router.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
        UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
        console.log('CSV file data has been uploaded in mysql database ');
    });

    return router;
}
