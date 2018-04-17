var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/angular-anon/dist' ));
app.set("views", path.join(__dirname, "./views"));

mongoose.connect('mongodb://localhost/AnonNotes');

var Schema = mongoose.Schema;

var NoteSchema = new mongoose.Schema({
    note: {
        type: String,
        minlength: [3, "Note must have more than 3 characters!"]
    }
}, {timestamps:true});

mongoose.model('Note', NoteSchema);
var Note = mongoose.model('Note');

// CREATE A NOTE
app.post('/api/notes', function(req, res) {
    var note = new Note({ note: req.body.note });
    note.save(function(err){
        if(err) {
            console.log("SERVER! NOTE CREATION ERROR!");
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SERVER! CREATED A NOTE!");
            res.json({message: "Success!"});
        }
    })
})

// GET ALL NOTES
app.get('/api/notes', function(req, res) {
    Note.find({}).exec(function(err, notes) {
        if(err) {
            console.log("SERVER! GETTING NOTES ERROR!");
            res.json({message: "Error!", error: err});            
        }
        else {
            console.log("SERVER! LIST OF NOTES!");
            res.json({message: "Success!", notes: notes})
        }
    })
})

//DELETE A NOTE
app.delete('/api/notes/:id', function(req, res) {
    Note.remove({ _id: req.params.id }, function(err) {
        if(err) {
            console.log("SERVER! DELETING A NOTE!");
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SERVER! DELETED A NOTE!");
            res.json({message: "Success!"})
        }
    })
})

// ******************** //

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-anon/dist/index.html"))
});

// ******************** //

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});