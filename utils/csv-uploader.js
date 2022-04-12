const fs = require('fs');
const csv = require('fast-csv');
const db = require('../config/config');


function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
            console.log(data)
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
                let query = 'INSERT INTO sites (Plot_ID, Scientific_Name, Performance_Standard_Approval, Planted_or_Volunteer, X_Coordinate, Y_Coordinate, MY0_Height, MY1_Height, MY2_Height, MY3_Height, MY4_Height, MY5_Height, MY6_Height, MY7_Height, MY8_Height, MY9_Height, MY10_Height, MY11_Height, MY12_Height, Map_ID) VALUES ?';
                    db.query(query, [csvData], (error, response) => {
                    console.log(error || response);
                }); 
                    
            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            fs.unlinkSync(filePath)
        });
 
    stream.pipe(csvStream);
}

module.exports = UploadCsvDataToMySQL;