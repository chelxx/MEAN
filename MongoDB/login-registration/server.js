var bcrypt = require("bcrypt-as-promised");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var express = require("express");
var path = require("path");

var app = express();

app.use(session({ secret: 'luvumichaelchoi' }));

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/LoginReg');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: [true, "First Name is required!"], 
        minlength: [2, "First Name must be longer than 2 characters!"] 
    },
    last_name: { 
        type: String, 
        required: [true, "Last Name is required!"], 
        minlength: [2, "Last Name must be longer than 2 characters!"] 
    },
    email: { 
        type: String, 
        required: [true, "Email Address is required!"],
        unique: [true, "Email already exists!"], 
        validate: {
            validator: function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: "Invalid Email Address!"
        }
    },
    password: { 
        type:String, 
        required: [true, "Password is required!"], 
        minlength: [8, "Password must be longer than 8 characters!"], 
        maxlength: [32, "Password cannot be longer than 32 characters!"],
        validate: {
            validator: function(pw){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(pw);
            },
            message: "Password failed the validation, you must have at least 1 number, 1 uppercase and 1 special character."
        }
    },
    birthday: { 
        type: Date,
        required: [true, "Birthday is required!"]
     },
     created_at: { 
         type: Date, 
         default: Date.now 
    },
})

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/registeruser', function (req, res) {
    if(req.body.password == req.body.confirm_pw){
        console.log("passwords match!");        
        var user = new User ({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            birthday: req.body.birthday,
        })
        user.save(function(err){
            if (err) {
                console.log("something went wrong, dude!");
                // HOW TO ADD ERRORS?!
                res.redirect('/')
            }
            else {
                console.log("successfully registered a user!");
                req.session.userID = user._id;
                var person = req.session.userID;
                console.log(person)
                res.render('success');
            }
        })
    }
    else {
        console.log("passwords do not match!");
        res.redirect('/');
    }
})

app.post('/loginuser', function (req, res) {
    res.render('success');
})

app.post('/logout', function (req, res) {
    console.log("destroying session! logging user out!")
    req.session.destroy();
    res.redirect('/');
})

// ******************** //

var server = app.listen(6789, function() {
    console.log('Listening on port 6789!');
});