// REQUIRE SESSION
var session = require("express-session");
// REQUIRE EXPRESS
var express = require("express");
// CONTAINS SEVERAL HELPER FXNS TO HELP WITH PATH MANIPULATION
var path = require("path");
// CREATE THE EXPRESS APP
var app = express();
// PARSES THE JSON, BUFFER, STRING, URL ENCODED DATA SUBMITTED USING HTTP POST
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// SESSION STRING FOR ENCRYPTION
app.use(session({secret: "codingdojorocks"}));
// STATIC CONTENT
app.use(express.static(path.join(__dirname, "./static")));
// EJS AND VIEWS FOLDER
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
// ROUTE - INDEX
app.get('/', function(req, res) {
    var counter = 0;
    if(req.session.counter) 
    {
        req.session.counter += 1;
        counter = req.session.counter;
        console.log("********** - " + counter + " - **********");
    }
    else
    {
        req.session.counter = 1;
        counter = req.session.counter;
        console.log("********** - " + counter + " - **********");
    }
    res.render("index", {counter: counter});
})
// ROUTE - INCREMENT COUNTER BY TWO
app.post('/plustwo', function(req, res) {
    req.session.counter += 1;
    res.redirect('/');
})
// ROUTE - RESET THE COUNTER
app.post('/reset', function(req, res) {
    req.session.counter = 0;
    res.redirect('/');
})
// LISTEN TO THE APP ON THIS PORT!
app.listen(6789, function () {
    console.log("Listening on port 6789!");
});