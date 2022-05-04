var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')
var csvtojson = require('csvtojson')
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            Car_ID INTEGER PRIMARY KEY,
            Judge_ID INTEGER, 
            Judge_Name text,
            Racer_Turbo INTEGER,
            Racer_Supercharged INTEGER,
            Racer_Performance INTEGER
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                csvtojson().fromFile(DATA_CSV)
                .then(data => {
                    let insert = 'INSERT INTO database (Car_ID, Judge_ID, Judge_Name, Racer_Turbo, Racer_Supercharged, Racer_Performance) VALUES (??????)';

                    for(const item of data) {
                        db.run(insert, [item.Car_ID, item.Judge_ID, item.Judge_Name, item.Racer_Turbo, item.Racer_Supercharged, item.Racer_Performance]);
                    }
                }).catch(err => {
                    // log error if any
                    console.log(err);
                });
        }
    })
}

module.exports = db