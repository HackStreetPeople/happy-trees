const fs = require('fs');
const csv = require('fast-csv');
const mysql = require('mysql')
// const db = require('../models');

const sqlConfig = process.env.NODE_ENV === 'development' ? {
    host: "localhost",
    user: "root",
    password: "password",
    database: "happytrees"
} : {
    host: process.env.SEQUELIZE_HOST,
    user: process.env.SEQUELIZE_USER,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DB
}
// Database connection
const db = mysql.createConnection(sqlConfig)
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(`${filePath}`);
    let csvData = [];
    let csvStream = csv
    .parse()
    .on("data", function (data) {
        csvData.push(data);
    })
    .on("end", function () {
        // Remove Header ROW
        csvData.shift();
        
        let query = `INSERT INTO ${mysql.escapeId(process.env.SEQUELIZE_DB)}.sites (Plot_ID, Scientific_Name, Performance_Standard_Approval, Planted_or_Volunteer, X_Coordinate, Y_Coordinate, MY0_Height, MY1_Height, MY2_Height, MY3_Height, MY4_Height, MY5_Height, MY6_Height, MY7_Height, MY8_Height, MY9_Height, MY10_Height, MY11_Height, MY12_Height, Map_ID) VALUES ?`;
        db.query(query, [csvData], (error, response) => {
                    console.log(error || response);

                    db.end(err => {
                        if (err) {
                            console.log('ERR CLOSING SQL CONNECTION')
                        }
                        console.log('CONNECTION CLOSED')
                      });
                }); 
                    
            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            fs.unlinkSync(filePath)
        });
 
    stream.pipe(csvStream);
}

module.exports = UploadCsvDataToMySQL;