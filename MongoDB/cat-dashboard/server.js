var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();
var path = require("path");

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/CatDashboard');
var CatSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    breed: { type: String, required: true, minlength: 2 },
    personality: { type: String, required: true, minlength: 2 },
    created_at: { type: Date, default: Date.now }
})

mongoose.model('Cat', CatSchema);
var Cat = mongoose.model('Cat');

app.get('/', function(req, res) {
    Cat.find({}).exec(function(err, cats){
        if(err) throw err;
        res.render("index", { "cats": cats })
    })
})
app.get('/newcat', function(req, res) {
    res.render("newcatform");
})
app.get('/viewcat/:id', function(req, res) {
    Cat.findOne({ _id: req.params.id }).exec(function(err, cat){
        if(err) throw err;
        res.render("onecat", { cat: cat })
    })
})
app.get('/editcat/:id', function(req, res) {
    Cat.findOne({ _id: req.params.id }).exec(function(err, cat){
        if(err) throw err;
        res.render("editcatform", { cat: cat })
    })
})

app.post('/createnewcat', function(req, res){
    var cat = new Cat({ name: req.body.name, breed: req.body.breed, personality: req.body.personality })
    cat.save(function(err){
        if(err) {
            console.log('something went wrong, dude!');
        } else { 
            console.log('successfully added a cat!');
            res.redirect('/newcat');
        }
    })
})

app.post('/editcat/:id', function(req, res){
    Cat.findOne({ _id: req.params.id }).exec(function(err, cat){
        if(err) {
            console.log('something went wrong, dude!')
            res.redirect('/');
        }
        else {
            cat.name = req.body.name || cat.name;
            cat.breed = req.body.breed || cat.breed;
            cat.personality = req.body.personality || cat.personality;
            cat.save();
            res.redirect('/');
            console.log("successfully updated a cat!");
        }
    })
})

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!"); 
});