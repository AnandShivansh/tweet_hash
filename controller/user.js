module.exports = function(app, passport){

	// Create user page
	app.get('/create_user', function(req, res){
		res.render('create_user', {});
	});

	// Login
	app.post('/', passport.authenticate('local-login', {
		//when user is found and password is matched
		successRedirect : '/secret',
		failureRedirect : '/error'
	}));

	// logout
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
 	});

	// Secret
	app.get('/secret', function(req, res){
		console.log('***console logging req.user:*** \n' + req.user);
		if(req.user){
		res.render('secret', {});
		} else {
		res.send('please login');
		}
	});

	//Twitter authentication
	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/search',
		failureRedirect: '/error'
	}));


}; 