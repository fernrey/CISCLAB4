var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')
var csvtojson = require('csvtojson')
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to SQLite database.')
        db.run(`CREATE TABLE cars (
            Car_ID INT PRIMARY KEY,
            Judge_ID INT,
            Judge_Name TEXT,
            Racer_Turbo INT,
            Racer_Supercharged INT,
            Racer_Performance INT
        )`),
        (err) => {
            if(err) {
                // Table already created
            } else {
                csvtojson.fromFile('./d66a59b6db4e59c16efd4c42ad411f8e/data.csv')
                .then(data => {
                    let insert = 'INSERT INTO cars (Car_ID, Judge_ID, Judge_Name, Racer_Turbo, Racer_Supercharged, Racer_Performance) VALUES (?,?,?,?,?,?)'
                    
                    for(const item of data) {
                        db.run(insert, [item.Car_ID, item.Judge_ID, item.Judge_Name, item.Racer_Turbo, item.Racer_Supercharged, item.Racer_Performance])
                    }
                }).catch(err => {
                    // log error if any
                    console.log(err)
                });
            }
        }
    }
});
module.exports = db