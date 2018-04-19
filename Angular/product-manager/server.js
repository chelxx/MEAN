var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/angular-product/dist' ));
app.set("views", path.join(__dirname, "./views"));

mongoose.connect('mongodb://localhost/ProductManager');

var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product Name is required!"],
        minlength: [3, "Product Title must have more than 3 characters!"]
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "Product Price is required!"]
    },
    url: {
        type: String,
        default: "https://cdn3.iconfinder.com/data/icons/user-interface-icons-bundle-18/32/910-512.png"
    }
}, {timestamps:true});

mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product');

// ******************** //
// START OF ROUTES

// LIST OF ALL PRODUCTS
app.get('/api/products', function(req, res) {
    Product.find({}).exec(function(err, products) {
        if(err) {
            console.log("SERVER! GETTING PRODUCTS ERROR!", err);
            res.json({message: "Error!", error: err});            
        }
        else {
            console.log("SERVER! LIST OF PRODUCTS!");
            res.json({message: "Success!", products: products})
        }
    })
})

// CREATE PRODUCT
app.post('/api/products', function(req, res) {
    var product = new Product({ title: req.body.title, price: req.body.price, url: req.body.url });
    product.save(function(err) {
        if(err) {
            console.log("SERVER! PRODUCT CREATION ERROR!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SERVER! CREATED A PRODUCT!");
            res.json({message: "Success!"});
        }
    })
})

// DELETE PRODUCT
app.delete('/api/products/:id', function(req, res) {
    Product.remove({ _id: req.params.id }, function(err) {
        if(err) {
            console.log("SERVER! PRODUCT DELETION ERROR!", err);
            res.json({message: "Error!", error: err});
        }
        else {
            console.log("SERVER! DELETED A PRODUCT!");
            res.json({message: "Success!"});
        }
    })
})

// FIND PRODUCT BY ID
app.get('/api/products/:id', function(req, res) {
    Product.findOne({ _id: req.params.id }, function(err, product){
        if(err){
            console.log("SERVER! GETTING PRODUCT BY ID ERROR!", err);            
			res.json({message: "Error!", error: err})
		}
		else {
            console.log("SERVER! GOT A PRODUCT BY ID!");            
			res.json({message: "Success!", product: product})
		}
    })
})

// EDIT PRODUCT
app.put('/api/products/:id', function(req, res) {
    var product = Product.findOne({ _id: req.params.id }).exec(function(err, product) {
        product.title = req.body.title;
        product.price = req.body.price;
        product.url = req.body.url;
        product.save(function(err, product) {
            if(err){
                console.log("SERVER! PRODUCT EDITING ERROR!", err);            
                res.json({message: "Error!", error: err})
            }
            else {
                console.log("SERVER! EDITED A PRODUCT");            
                res.json({message: "Success!", product: product})
            }
        })
    })
})

// END OF ROUTES
// ******************** //

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-product/dist/index.html"))
});

// ******************** //

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});