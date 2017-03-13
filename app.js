var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var apiKey = require('./config.json');



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
  consumer_key:         apiKey.twitter.consumerKey,
  consumer_secret:      apiKey.twitter.consumerSecret,
  access_token:         apiKey.twitter.accessToken,
  access_token_secret: 	apiKey.twitter.accessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

app.get('/', function(req, res){
	
	// 
	//  filter the twitter public stream by the word 'mango'. 
	// 
	var stream = T.stream('statuses/filter', { track: 'mango' })
 
	stream.on('tweet', function (tweet) {
  	console.log(tweet);
	})

})






// Create server
app.listen(3000, function(){
	console.log('Listening on port 3000');
});