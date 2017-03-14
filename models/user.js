var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	password : String,
	twitter: {
		accessToken: String,
		refreshToken: String,
		id: String,
		profile: mongoose.Schema.Types.Mixed
	}
});

// Methods
/***
 *	Pre-save hash password when a user is created
 */ 
userSchema.pre('save', function(next){
	const user = this;

	if(!user.isModified('password')) { return next(); }

	bcrypt.genSalt(10, (err, salt) => {
		if(err){ return next(err); }

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if(err){ return next(err); }
			user.password = hash;
			console.log('***successfully added salt to password***\n' + 
				user.password +
				'\n ^^^^salted password^^^^');
			next();
		});
	});
});

/**
 *	Compare password
 */
userSchema.methods.validPassword = function (candidatePassword, cb) {
	//take in the inputted password from the form and compare with encrypted password in DB
	//compare by unsalting thne using the hash the encrypted password
    console.log('***************** \n inputted password:' + candidatePassword +
			'\n this.password:' + this.password + '\n ****************');
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        cb(err, isMatch);

    });
};

var User = mongoose.model('User', userSchema);



module.exports = User;