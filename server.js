var express = require('express');
var mysql = require('mysql');
var passport = require('passport-http');
var app = express();
var connection = mysql.createConnection({
	host	: 'hopper.wlu.ca',
	user	: 'cram7290',
	password : 'bigtop6',
	database : 'cram7290'
});
connection.connect();
connection.query('Select * from UserAuthentication', function(err, rows,fields){
	console.log(rows);
});
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.get('/profile', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('profile');
});
app.get('/popular-stocks', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('popular-stocks');
});

app.get('/stock-information', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('stock_information');
});
app.get('/navigation', function(req, res){
	res.render('navigation');
});
app.get('/login', function(req,res){
	res.render('login');
});
app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});


//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

app.get('/myaction', function(req, res) {
	res.writeHeader(200, {'Content=type': "text/html"});
	res.write("<p>You send the name :" +req.body.name);
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});