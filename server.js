var express = require('express');
var mysql = require('mysql');
var passport = require('passport-http');
var bodyParser = require('body-parser');
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

app.use(bodyParser());
app.get('/myaction',function(req,res){
	var html = '<form action="/myaction" method="post"'+
				'Enter your name:' +
				'<input type="text" name="UserName" placeholder="..."/>' +
				'button type="submit">Submit</button>'+'</form>';
	res.send(html);
});
app.post('/myaction',function(req,res){
	var userName = req.body.userName;
	var html = 'Hello: ' + userName + '.<br>';
	res.send(html);
});