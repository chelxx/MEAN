var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var app = express();

app.use(express.static(__dirname+'/angular-weather/dist'));

app.all("*", (req,res,next)=>{
	res.sendFile(path.resolve("./angular-weather/dist/index.html"))
})

// ******************** //

app.listen(6789, function(){
	console.log("Listening on port 6789!")
})