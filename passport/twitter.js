var twitterStrategy = require('passport-twitter').Strategy;
var User = require( '../models/user');
var apiKey = require('../config.json');

var callback = 'https://tweet-counter.herokuapp.com/auth/twitter/callback';

module.exports = function(passport) {

	// Serialize functions
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

	// Twitter strategy
	passport.use(new twitterStrategy({
	    consumerKey: apiKey.twitter.consumerKey,
	    consumerSecret: apiKey.twitter.consumerSecret,
	    callbackURL: callback,
	    includeEmail: true
  	},

  	function(token, tokenSecret, profile, cb) {

  		var userEmail = profile.emails[0].value;

				User.findOne( {'email' : userEmail}, function(err, user){
					//If User email does not exist in the database, create new User and save into DB
					if(!user){
						//create new user
						var newUser = new User();
						newUser.twitter.accessToken = token;
						newUser.twitter.refreshToken = tokenSecret;
						newUser.twitter.profile = profile;
						newUser.twitter.id = profile.id_str;
						newUser.email = userEmail;
						//save new user to DB
						newUser.save(function(err, newUser){
							if(err){
								console.log(err);
								return cb(null, false);
							}

							console.log('*** newUser Twitter created ***\n', newUser, '\n*************');
							//login new user
							return cb(null, newUser);
						});

					//If user email in the database, merge twitter data into user
					} else {
						//merge twitter data to existing user
						console.log('*** user exists, merge twitter data to user ***');
						user.twitter.accessToken = token;
						user.twitter.refreshToken = tokenSecret;
						user.twitter.profile = profile;
						user.twitter.id = profile.id;
						console.log('******', user.twitter.profile, '\n******');
						//save user details to DB
						user.save(function(err, user){
							if(err){
								console.log(err);
							}
								//login user
								return cb(null, user);

						})

					}
				})

			}

		));
}
