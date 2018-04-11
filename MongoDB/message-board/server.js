var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/MessageBoard');

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
    msgname: { type: String, required: true, minlength: 2 },
    message: { type: String, required: true, minlength: 2 },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    created_at: { type: Date, default: Date.now}
})

var CommentSchema = new mongoose.Schema({
    cmntname: { type: String, required: true, minlength: 2 },
    comment: { type: String, required: true, minlength: 2 },
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    created_at: { type: Date, default: Date.now}
})

mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

app.get('/', function(req, res) {
    Message.find({}).exec(function(err, messages){
        Comment.find({}).exec(function(err, comments){
            res.render("index", { "messages": messages, "comments": comments });
        })
    })
})

app.post('/createmessage', function(req, res){
    var message = new Message({ msgname: req.body.msgname, message: req.body.message })
    message.save(function(err){
        if(err) {
            console.log('something went wrong!');
            Message.find({}).exec(function(err, messages){
                if(err) throw err;
                res.render("index", { "messages": messages, errors: message.errors})
            })
        } else {
            console.log('successfully added a message!');
            res.redirect('/');
        }
    })
})

app.post('/createcomment/:id', function(req, res){
    Message.findOne({_id: req.params.id}, function(err, message) {
    var comment = new Comment({ cmntname: req.body.cmntname, comment: req.body.comment })
    coessage._id;
    message.comments.push(comment);
    comment.save(function(err){
        message.save(function(err){
            if(err) {
                console.log('something went wrong!');
                Message.find({}).exec(function(err, messages){
                    if(err) throw err;
                    res.render("index", { "messages": messages, errors: message.errors})
                })
            } else {
                console.log('successfully added a comment!');
                res.redirect('/');
            }
            })
        })
    })
})

// ******************** //

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});