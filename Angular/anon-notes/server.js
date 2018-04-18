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
        required: true,
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
            console.log("SERVER! NOTE CREATION ERROR!", err);
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
            console.log("SERVER! GETTING NOTES ERROR!", err);
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
            console.log("SERVER! DELETING A NOTE!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SERVER! DELETED A NOTE!");
            res.json({message: "Success!"})
        }
    })
})

// FIND A NOTE BY ID TO EDIT
app.get('/api/notes/:id', function(req, res) {
    Note.findOne({ _id: req.params.id }, function(err, note) {
        if(err){
            console.log("SERVER! GETTING NOTE BY ID ERROR!", err);            
			res.json({message: "Error!", error: err})
		}
		else {
            console.log("SERVER! GOT A NOTE BY ID!");            
			res.json({message: "Success!", note: note})
		}
    })
})

// EDIT A NOTE
app.put('/api/notes/:id', function(req, res){
    var note = Note.findOne( { _id: req.params.id }).exec(function(err, note){
    note.note = req.body.note;
    note.save(function(err, note){
        if(err) {
            console.log("SERVER! UPDATING A NOTE!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SUCCESS! UPDATED THE NOTE!")
            res.json({message: "Success!", note: note});
        }
    })
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