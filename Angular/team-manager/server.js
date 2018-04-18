var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/angular-app/dist' ));
app.set("views", path.join(__dirname, "./views"));

mongoose.connect('mongodb://localhost/TeamManager');

var Schema = mongoose.Schema;

var PlayerSchema = new mongoose.Schema({
    player: {
        type: String,
        required: true,
        minlength: [3, "Player Name must have more than 3 characters!"],
        validate: {
            validator: function(fname){
                return /^[a-z ,.'-]+$/i.test(fname);
            },
            message: "Player Name cannot contain any special characters!"
        }
    },
    position: {
        type: String,
        required: true
    },
    status: {
        game1: {}
    }

}, {timestamps:true});

mongoose.model('Player', PlayerSchema);
var Player = mongoose.model('Player');

// ********************
// START OF ROUTES

// END OF ROUTES
// ********************

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-anon/dist/index.html"))
});

// ********************

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});