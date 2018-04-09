var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/1955API');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
})

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.get('/', function(req, res) {
    console.log("THIS BITCH!");
    User.find({}, function(err, users){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
           res.json({ birthday_boys_and_girls: users})
        }
    })
})

app.get('/new/:name', function(req, res) {
    var user = new User({ name: req.params.name })
    user.save( function(err){
        if (err) {
            res.json({ error: err })
        }
        else {
            res.redirect('/')
        }
    })
})

app.get('/:name', function(req, res) {
    User.findOne({ name: req.params.name }, function(err, user){
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({ user })
        }
    })
})

app.get('/remove/:name', function(req, res) {
    User.remove({ name: req.params.name}, function(err){
        if (err) {
            res.json({ error: err })
        }
        else {
            res.render('/')
        }
    })
})

// ******************** //

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});