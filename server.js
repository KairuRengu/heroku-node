var express = require('express');
var mysql = require('mysql');
var util = require('util');
var TwitterStrategy = require('passport-twitter').Strategy
var session = require('express-session');

var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('configuration/config');

//----------------------------------------Database Connection Example---------------------
var connection = mysql.createConnection({
	host	: 'hopper.wlu.ca',
	user	: 'cram7290',
	password : 'bigtop6',
	database : 'cram7290'
});

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));


//-----------------------------------------------------Page Routers ----------------------------
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

//------------------------------------------------- Open Port ------------------------------------
app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});