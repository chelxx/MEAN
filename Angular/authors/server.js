
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/angular-authors/dist' ));
app.set("views", path.join(__dirname, "./views"));

mongoose.connect('mongodb://localhost/Authors');

var Schema = mongoose.Schema;

var AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "First Name is required!"],
        minlength: [2, "First Name must be longer than 2 characters!"],
        validate: {
            runValidator: true,
            validator: function(fname){
                return /^[a-z ,.'-]+$/i.test(fname);
            },
            message: "Author Name cannot contain any special characters!"
        }
    },
}, {timestamps: true});

mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');

// ******************** //

app.get('/authors', function(req, res){
    Author.find({}).exec(function(err, authors){
        if(err) {
            console.log("BACKEND! SOMETHING WENT WRONG GETTING ALL AUTHORS!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SUCCESS! GOT ALL THE AUTHORS!")
            res.json({message: "Success!", authors: authors});
        }
    })
})

app.get('/author/:id', function(req, res){
    Author.findOne({ _id: req.params.id }).exec(function(err, author){
        if(err) {
            console.log("BACKEND! SOMETHING WENT WRONG GETTING THE AUTHOR!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SUCCESS! GOT THE AUTHOR!")
            res.json({message: "Success!", author: author});
        }
    })
})

app.post('/author', function(req, res){
    var author = new Author({ name: req.body.name });
    author.save(function(err){
        if(err) {
            console.log("BACKEND! SOMETHING WENT WRONG CREATING THE AUTHOR!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SUCCESS! CREATED AN AUTHOR!")
            res.json({message: "Success!", author: author});
        }
        
    })
})

app.put('/author/:id', function(req, res){
    var author = Author.update({ _id: req.params.id }, { name: req.body.name }, function(err, author){
        if(err) {
            console.log("BACKEND! SOMETHING WENT WRONG UPDATING THE AUTHOR!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SUCCESS! UPDATED THE AUTHOR!")
            res.json({message: "Success!", author: author});
        }
    })
})

app.delete('/author/:id', function(req,res){
	Author.remove({ _id: req.params.id }, function(err, author){
        if(err) {
            console.log("BACKEND! SOMETHING WENT WRONG DELETING THE AUTHOR!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SUCCESS! DELETED THE AUTHOR!")
            res.json({message: "Success!", author: author});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-authors/dist/index.html"))
});

// ******************** //

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});

// NOTES:
// HOW TO MAKE SO THAT WHEN A FUNCTION IS DONE RUNNING, IT REDIRECTS TO THE HOME PAGE
// PROBLEM: I CAN ADD SPECIAL CHARS WHEN EDITING. THE FUCK BRO
// HOW DO I SHOW BACKEND VALIDATIONS ON THE PAGE??