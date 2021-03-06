const router = require('express').Router();
const UploadCsvDataToMySQL = require("../utils/csv-uploader")
//const downloadTree = require("../utils/csv-downloader")
const multer = require('multer')
const path = require('path')

// use multer to handle the csv file.
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')    
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
        UploadCsvDataToMySQL('uploads/' + req.file.filename, db);
        console.log('CSV file data has been uploaded in mysql database ');

        res.redirect('/')
    });

    //router.get('/downloads', downloadTree.downloads)

    return router;
}
