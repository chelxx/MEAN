var session = require("express-session");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({secret: "codingdojorocks"}));

app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render("index");
})

var server = app.listen(6789, function() { // define which port the app will listen to
    console.log("Listening on port 6789!"); // console.log this line!
});

var io = require('socket.io').listen(server); // retrieving an object from the server (line 21) and pass it into the socket

io.sockets.on('connection', function (socket) { 

    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    
    socket.on( "posting_form", function (data){
        console.log( 'Someone clicked a button!  Reason: '  + data.reason);
        socket.emit( 'updated_msg', {data});        
        let random = Math.floor(Math.random() * 1000);
        socket.emit( 'random', {random: random});
    });
});