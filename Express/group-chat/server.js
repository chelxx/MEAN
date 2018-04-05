// BACK END SERVER
var express = require('express');
var socket = require('socket.io');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({secret: 'luvumichaelchoi'}));

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

var server = app.listen(6789, function() {
    console.log('Listening on port 6789!');
});

var io = socket(server);

io.on('connection', function(socket){
    console.log('Made the socket connection!', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    })

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })
});