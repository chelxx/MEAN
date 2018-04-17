var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/angular-authors/dist' ));
app.set("views", path.join(__dirname, "./views"));

mongoose.connect('mongodb://localhost/Authors');

// ******************** //

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-authors/dist/index.html"))
});

// ******************** //

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});