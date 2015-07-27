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

function checkAuth(req, res, next){
	if(!req.session.user_id){
		res.send('You are not authirzed to view this page.');
	}else{
		next();
	}
}
app.get('/my_secret_page', checkAuth, function (req, res){
	res.send('If you are viewing this page it means you are logged in');
});

app.post('/login', function (req, res){
	var post = req.body;
	if( post.user == 'john' && post.password == 'johnspassword'){
		req.session.user_id = johns_usre_id_here;
		res.redirect('/my_secret_page');
	}else{
		res.send('Bad user/pass');
	}
});
app.get('/logout', function (req,res){
	delete req.session.user_id;
	res.redirect('/login');
});
var http = require("http");
var url = require("url");

http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type":"text/plain"});
    var params = url.parse(request.url,true).query;

    console.log(params);

    var a = params.number1;
    var b = params.number2;

    var numA = new Number(a);
    var numB = new Number(b);

    var sum = new Number(numA + numB).toFixed(0);

    response.write(sum);
    response.end();
}).listen(10001);