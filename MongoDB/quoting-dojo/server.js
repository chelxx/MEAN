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

mongoose.connect('mongodb://localhost/QuotingDojo');
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, minlength: 2 },
    date: { type: Date, default: Date.now, required: true }
})

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.get('/', function(req, res) {
    res.render("index");
})

app.get('/viewquotes', function(req, res) {
    Quote.find({}).exec(function(err, quotes){
        if(err) throw err;
        res.render("quotes", { "quotes": quotes })
    })
})

app.post('/create', function(req, res){
    var quote = new Quote({ name: req.body.name, quote: req.body.quote })
    quote.save(function(err){
        if(err) {
            console.log('something went wrong!');
            Quote.find({}).exec(function(err, quotes){
                if(err) throw err;
                res.render("index", { "quotes": quotes, errors: quote.errors})
            })
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a quote!');
            res.redirect('/');
        }
    })
})

var server = app.listen(6789, function() { // define which port the app will listen to
    console.log("Listening on port 6789!"); // console.log this line!
});

// Notes: 
// The quote's date on the html is fucked up. Fix?
// How to sort quotes in descending order?