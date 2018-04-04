var session = require("express-session");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var path = require("path");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({secret: "codingdojorocks"}));

app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render("index");
})
app.post('/submit', function(req, res) {
    let result = 
    {
        name: req.body.name,
        location: req.body.location,
        language: req.body.language,
        comment: req.body.comment,
    }
    res.render("result", {result});
})

app.listen(6789, function () {
    console.log("Listening on port 6789!");
});