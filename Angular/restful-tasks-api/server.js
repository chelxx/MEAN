var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/angular/dist' ));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/RESTfulTasksAPI');

var Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2 },
    description: { type: String, required: true, minlength: 2 },
    completed: {type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

app.get('/tasks', function(req, res) {
    Task.find({}, function(err, tasks){
        if(err){
           res.json({message: "Error!", error: err})
        }
        else {
           res.json({message: "Success!", result: tasks})
        }
    })
})

app.get('/viewtask/:id', function(req, res){
    Task.findOne({ _id: req.params.id }, function(err, task){
        if(err){
			res.json({message: "Error!", error: err})
		}
		else {
			res.json({message: "Success!", result: task})
		}
    })
})

app.post('/newtask', function(req,res){
    console.log(req.body)
	var task = new Task({ title: req.body.title, description: req.body.description, completed: req.body.completed })
	task.save(function(err, tasks){
		if(err){
			res.json({message: "Error!", error: err})
        }
        else {
            res.json({message: "Success!", body: tasks})
        }
	})
})

app.put('/updatetask/:id', function(req,res){
	var task = Task.update({ _id: req.params.id }, { title:req.body.title, description: req.body.description, completed: req.body.completed }, function(err, tasks){
		if(err){
			res.json({message: "Error!", error: err})
        }
        else {
            res.json({message: "Success!", body: tasks})
        }
	})
})

app.delete('/deletetask/:id', function(req,res){
	Task.remove({ _id: req.params.id }, function(err, tasks){
		if(err){
			res.json({message: "Error!", error: err})
        }
        else {
            res.json({message: "Success!", body: tasks})
        }
	})
})

// ******************** //

var server = app.listen(6789, function() {
    console.log("Listening on port 6789 bro!");
});