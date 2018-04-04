var express = require("express");

var app = express();

app.get('/', function(request, response){
    console.log("********************");
    console.log(request);
    console.log("********************");
    console.log(response);
    console.log("********************");
    response.send("Hello Express!");
})

app.listen(6789, function(){
    console.log("Listening on port 6789!");
})