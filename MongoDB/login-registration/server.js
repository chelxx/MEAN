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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/LoginReg');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: [true, "First Name is required!"], 
        minlength: [2, "First Name must be longer than 2 characters!"],
        validate: {
            validator: function(fname){
                return /^[a-z ,.'-]+$/i.test(fname);
            },
            message: "First Name cannot contain any special characters!"
        }
    },
    last_name: { 
        type: String, 
        required: [true, "Last Name is required!"], 
        minlength: [2, "Last Name must be longer than 2 characters!"],
        validate: {
            validator: function(lname){
                return /^[a-z ,.'-]+$/i.test(lname);
            },
            message: "Last Name cannot contain any special characters!"
        }
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
            message: "Password must have at least 1 number, 1 uppercase and 1 special character."
        }
    },
    birthday: { 
        type: Date,
        required: [true, "Birthday is required!"],
        validate: {
            validator: function(bday) {
                return bday.getTime() < new Date().getTime();
            },
            message: "Invalid Birthday! Time travelers are not welcome here!"
        }
     },
     created_at: { 
         type: Date, 
         default: Date.now 
    }
    // USING TIMESTAMP TRUE DOES NOT WORK FOR ME?? IS IT MY F UP SYNTAX??
})

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10).then(hash => {
        this.password = hash;
        next();
    })
})

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/registeruser', function (req, res) {
    console.log(req.body);
    // VALIDATE FOR EXISTING EMAIL
    if(req.body.password == req.body.confirm_pw){
        console.log(req);
        console.log("**passwords:", req.body.password, req.body.confirm_pw); // BOTH ARE UNDEFINED? THE FUCK THO
        console.log("passwords match!");        
        var user = new User ({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            email: req.body.email,
            password: req.body.password
        })
        console.log("**form results:", req.body.first_name, req.body.last_name, req.body.email);
        user.save(function(err){
            if (err) {
                console.log("something went wrong, dude!");
                // IS THIS THE RIGHT WAY TO SHOW ERRORS?
                // ONLY THE REQUIRED ERRORS ARE SHOWING
                User.find({}).exec(function(err){
                    if(err) throw err;
                    res.render("index", { errors: user.errors })
                })
            }
            else {
                console.log("successfully registered a user!");
                req.session.userID = user._id;
                console.log(req.session.userID)
                console.log(user.first_name);
                res.render('success', { user });
            }
        })
    }
    else {
        console.log("passwords do not match!");
        res.redirect('/');
    }
})

app.post('/loginuser', function (req, res) {
    User.findOne({email: req.body.loginemail}).exec(function(err, user){
        console.log(req.body.loginemail);
        if(err){
            console.log("shitty email address!");
            res.redirect('/');
        }
        if(user == null) {
            console.log("email address does not exist!");
            res.redirect('/')
        }
        else {
            console.log("not a shitty email address! go ahead!");
            console.log(req.body.loginpassword, user.password);
            bcrypt.compare(req.body.loginpassword, user.password).then(results => {
                if(results == true)
                {
                    req.session.userID = user._id;
                    console.log(req.session.userID)
                    console.log(user.first_name);
                    res.render('success', { user });
                }
                else {
                    res.redirect('/');
                }
            })
            .catch(err =>  {
                console.log("incorrect password!");
                res.redirect('/');
            })
        }
    })
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