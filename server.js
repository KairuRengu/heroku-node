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
if(config.use_database === "true"){
	connection.connect();
}
passport.serializeUser(function(user,done){
	done(null,user);
});
passport.deserializeUser(function(obj, done){
	done(null,obj);
});
// Use the TwitterStrategy within Passport.

passport.use(new TwitterStrategy({
consumerKey: config.twitter_api_key,
consumerSecret:config.twitter_api_secret ,
callbackURL: config.callback_url
},
function(token, tokenSecret, profile, done) {
process.nextTick(function () {
//Check whether the User exists or not using profile.id
if(config.use_database===’true’)
{
//Perform MySQL operations.
});
}
return done(null, profile);
});
}
));

app.set(‘views’, __dirname + ‘/views’);
app.set(‘view engine’, ‘ejs’);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: ‘keyboard cat’, key: ‘sid’}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + ‘/public’));

app.get(‘/’, function(req, res){
res.render(‘index’, { user: req.user });
});

app.get(‘/account’, ensureAuthenticated, function(req, res){
res.render(‘account’, { user: req.user });
});

app.get(‘/auth/twitter’, passport.authenticate(‘twitter’));

app.get(‘/auth/twitter/callback’,
passport.authenticate(‘twitter’, { successRedirect : ‘/’, failureRedirect: ‘/login’ }),
function(req, res) {
res.redirect(‘/’);
});

app.get(‘/logout’, function(req, res){
req.logout();
res.redirect(‘/’);
});

function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect(‘/login’)
}
var app = express();

var server = app.listen(port);
var server = http.createServer(app);





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