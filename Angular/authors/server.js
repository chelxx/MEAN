
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
    quotes: [{
        quote: { 
            type: String, 
            required: [true, "Quote is required!"],
            minlength: [2, "Quote must be longer than 2 characters!"],
        },
        votes: {
            type: Number,
            default: 0
        }
    }],
}, {timestamps: true});

mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');

// ******************** //

app.get('/api/authors', function(req, res){
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

app.get('/api/author/:id', function(req, res){
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

app.post('/api/author', function(req, res){
    var author = new Author({ name: req.body.name });
    console.log(author)
    author.save(function(err){
        if(err) {

            console.log("BACKEND! SOMETHING WENT WRONG CREATING THE AUTHOR!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log(author)
            console.log("SUCCESS! CREATED AN AUTHOR!")
            res.json({message: "Success!"});
        }
    })
})

app.put('/api/author/:id', function(req, res){
    var author = Author.findOne( {_id: req.params.id}).exec(function(err, author){
    author.name = req.body.name;
    author.save(function(err, author){
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
})


app.delete('/api/author/:id', function(req,res){
	Author.remove({ _id: req.params.id }, function(err, author){
        if(err) {
            console.log("BACKEND! SOMETHING WENT WRONG DELETING THE AUTHOR!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            Author.find({}).exec(function(err, authors){
                if(err) {
                    console.log("BACKEND! SOMETHING WENT WRONG GETTING ALL AUTHORS AFTER DELETE!", err);
                    res.json({message: "Error!", error: err});
                }
                else {
                    console.log("SUCCESS! GOT ALL THE AUTHORS AFTER DELETE!")
                    res.json({message: "Success!", authors: authors});
                }
            })
        }
    })
})

// ********** QUOTES ********** //

app.get('/api/quotes', function(req, res){
    Author.find({}).exec(function(err, quotes){
        if(err) {
            console.log("BACKEND! SOMETHING WENT WRONG GETTING ALL QUOTES!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SUCCESS! GOT ALL THE QUOTES!")
            res.json({message: "Success!", quotes: quotes});
        }
    })
})

app.put('/api/quote/:id', function(req, res){
    if(req.body.quote.length < 2) {
        console.log("BACKEND! ADDING A QUOTE TOO SHORT!");
        res.json({message: "Error!", error: "Quote must be at least 2 characters!"});
    }
    else {
        Author.update({ _id: req.params.id }, {$push: { quotes: req.body }}).exec(function(err) {
            if(err) {
                console.log("BACKEND! SOMETHING WENT WRONG CREATING AN AUTHOR QUOTE!", err);
                res.json({message: "Error!", error: err});
            }
            else {
                console.log("SUCCESS! CREATED AN AUTHOR QUOTE!")
                res.json({message: "Success!"});
            }
        })
    }
})

app.get('/api/allquotes/:id', function(req, res) {
    Author.find({ _id: req.params.id }).exec(function(err, authors){
        if(err) {
            console.log("BACKEND! SOMETHING WENT WRONG GETTING ALL AUTHORS QUOTES!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SUCCESS! CREATED AN AUTHOR QUOTE!")
            res.json({message: "Success!", authors: authors});
        }
    })
})

app.delete('/api/quote/:id/:quoteid', function(req, res) {
    console.log("BACKEND! DELETING A QUOTE!", req.params.id, req.params.quoteid);
    Author.update({ _id: req.params.id }, { $pull: { quotes: { _id: req.params.quoteid }}}, function(err) {
        if (err){
            console.log("BACKEND! SOMETHING WENT WRONG DELETING AN AUTHORS QUOTE!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            Author.find({ _id: req.params.id }).exec(function(err, authors){
                if(err) {
                    console.log("BACKEND! SOMETHING WENT WRONG DELETING A QUOTE!", err);
                    res.json({message: "Error!", error: err});
                }
                else {
                    console.log("SUCCESS! QUOTE DELETED!")
                    res.json({message: "Success!", authors: authors});
                }
            })
        }
    })
})

app.put('/api/voteup/:id/:quoteid', function(req, res) {
    console.log(req.params.id)
    console.log(req.params.quoteid)    
    Author.findOne({ _id: req.params.id }, function(err, author) {
        if (err) {
            console.log("BACKEND! SOMETHING WENT WRONG WITH VOTING UP!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("BACKEND! GOT THE AUTHOR QUOTES!", author);
            console.log("BACKEND! GOT THE AUTHOR QUOTES PART 2!", author.quotes); 
            for (var i = 0; i < author.quotes.length; i++) {
                if (author.quotes[i]._id == req.params.quoteid) {
                    console.log(author.quotes[i].quote)
                    console.log(author.quotes[i].votes)                 
                    author.quotes[i].votes++;
                }
            }
            author.save (function(err) {
                if (err) {
                    console.log("ERROR! VOTE UP PROBLEM!", err);
                    res.json({message: "Error!", error: err});
                }
                else {
                    console.log("SUCCESS! VOTE UP!");
                    res.json({message: "Success!", author: author})
                }
            })
        }   
    })
})

app.put('/api/votedown/:id/:quoteid', function(req, res) {
    console.log(req.params.id)
    console.log(req.params.quoteid)    
    Author.findOne({ _id: req.params.id }, function(err, author) {
        if (err) {
            console.log("BACKEND! SOMETHING WENT WRONG WITH VOTING UP!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("BACKEND! GOT THE AUTHOR QUOTES!", author);
            console.log("BACKEND! GOT THE AUTHOR QUOTES PART 2!", author.quotes); 
            for (var i = 0; i < author.quotes.length; i++) {
                if (author.quotes[i]._id == req.params.quoteid) {
                    console.log(author.quotes[i].quote)
                    console.log(author.quotes[i].votes)                 
                    author.quotes[i].votes--;
                }
            }
            author.save (function(err) {
                if (err) {
                    console.log("ERROR! VOTE UP PROBLEM!", err);
                    res.json({message: "Error!", error: err});
                }
                else {
                    console.log("SUCCESS! VOTE UP!");
                    res.json({message: "Success!", author: author})
                }
            })
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