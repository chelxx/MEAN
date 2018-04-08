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
});

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});

var io = require('socket.io').listen(server);
let count = 0;
io.sockets.on('connection', function (socket) { 
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);

    socket.on( "counter", function (data){
        count += 1;
        console.log(count)
        io.emit('server_response', {response: "Hello, client!", count: count});
    });
    socket.on( "reset", function (data){
        count = 0;
        io.emit('server_response', {response: "Hello, client!", count: count});
    });
});