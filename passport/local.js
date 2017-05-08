var localStrategy = require('passport-local').Strategy;
var User = require( '../models/user');
var validator = require('validator');

module.exports = function( passport ){

	// Serialize functions
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

	// Passport email / password login
	passport.use('local-login', new localStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback: true
    },
    function(req, email, password, done){

      console.log('******** user input used for localStrategy ******* \n' +
                  email, password + '\n************************');

      //call this event in the next tick in the event loop
        process.nextTick(function(){

          //if validation returns false, bump out of the function and return false
          if(!validator.isEmail(email) && !password.length > 6){
            return done(null, false);
          }

          //If found user email in the database
          User.findOne( {'email' : email }, function(err, user){
            if(err){
              return done(err);
            }

            if(!user){
              return done(null,false);
            }
            //validPassword method invoked from models/user.js
            if(!user.validPassword(password, function(err, isMatch){

            	if(isMatch){
					return done(null, user);
            	}else{

            		return done(null,false);
            	}

            }));
    	  });
  		});
  	}));
}