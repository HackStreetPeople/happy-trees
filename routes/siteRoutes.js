const router = require('express').Router();
const UploadCsvDataToMySQL = require("../utils/csv-uploader")
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '/uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({
    storage: storage
});


module.exports = (db) => {
    // post the excel file to the database
    router.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
        UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
        console.log('CSV file data has been uploaded in mysql database ');
    });

    return router;
}
