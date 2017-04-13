var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var app = express();
var port = 3000;

//Socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var sockets = require('./sockets/socket')(io);

// Connect with MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_sb7vvvf3:2651unr7rlugoi8gva8asus6dp@ds059165.mlab.com:59165/heroku_sb7vvvf3');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cookieSession());

// Setup sessions
app.use(session({ secret: 'tweetcount' }));
app.use(passport.initialize());
app.use(passport.session());

// Setup strategies
require('./passport/local')(passport);
require('./passport/twitter')(passport);

// Import controllers
var users = require('./controller/user')(app, passport, io);
var hashtags = require('./controller/hashtags')(app, io);
var tweet = require('./controller/tweets');

// Routes
app.get('/', function(req, res){
	res.render('index');
})

app.get('/dashboard', function(req, res){
	res.render('dashboard');
})

// Listen for server init
server.listen(port, function () {
  console.log('Server listening at port %d', port);
})
