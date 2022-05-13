// Create express app
var express = require("express")
var app = express()
const router = express.Router();
var db = require("./database.js")
const cors = require("cors")
const carRoutes = require('./routes/CarRoutes')
// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

//API endpoints
app.get("/", (req, res, next) => {
    var sql = "select * from cars"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

//get cars based on id
router.get("/:id", (req, res, next) => {
    const sql = `SELECT *
                 FROM cars
                 WHERE car_id = '${req.params.id}'`
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "status": "success",
            "data": rows
        })
    });
});


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});


app.use(function (req, res) {
    res.status(404);
});