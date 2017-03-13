var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var twitterApiKey = require('./config.json');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Create twit object
var Twit = require('twit');

var T = new Twit({
  consumer_key:         twitterApiKey.twitter.consumerKey,
  consumer_secret:      twitterApiKey.twitter.consumerSecret,
  access_token:         twitterApiKey.twitter.accessToken,
  access_token_secret: 	twitterApiKey.twitter.accessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

app.get('/', function(req, res){
	res.send(twitterApiKey);
})


// Create server
app.listen(3000, function(){
	console.log('Listening on port 3000');
});