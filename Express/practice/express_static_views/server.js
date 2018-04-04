var express = require("express");

var app = express();

app.get('/', function(request, response){
    response.send("<h1>Hello Express!</h1><h2>This is another line!</h2>")
})

app.use(express.static(__dirname + "/static"));
console.log("Hello!");
console.log(__dirname);

app.set('views', __dirname + '/views'); 

app.set('view engine', 'ejs');

app.get("/users", function (request, response){
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('users', {users: users_array});
})

app.listen(6789, function() {
    console.log("Listening on port 6789!");
})