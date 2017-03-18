var mongoose = require('mongoose');
var Hashtag = require('../models/hashtag');
var tweet = require('../controller/tweets');




var stream = null;

module.exports = function(app){

	// Read hashtags route
	app.get('/hashtag', function(req, res){

		var userIdProp = req.user['_id'];

		//find all hashtags that the user has inputted
		Hashtag.find({'users': userIdProp}, function(err, hashtag){
			if (err){
				return console.log('mongodb find function error', err);
			}
			res.json(hashtag);
		})
	})

	// Delete hashtag route
	app.delete('/hashtag/:id', function(req, res){

		//Retrieve hashtag user clicked on
		var id = decodeURIComponent(req.params.id);
		
		//Delete hashtag from DB
		Hashtag.remove({'tag': id}, function(err, hashtag){
			if(err){
				return console.log(err);
			}
			console.log('Removed hashtag from db');
			res.json(hashtag);

			//Update Twitter Stream hashtag filter
			Hashtag.distinct('tag', function(err, hashtagFilter){
				if(err){
					return console.log(err);
				}

				//Close twitter stream api if open, and reopen with new hashtag filter
				console.log('hashtagfilter from mongoose: ', hashtagFilter);
				tweet.twitterStream(hashtagFilter);
			})

		})
	})

	// Create hashtag route
	app.post('/hashtag', function(req, res){

		//Normalise hashtag inputted by User
		var tagProp = req.body.tag.toLowerCase();
		var firstInputChar = tagProp.charAt(0);

		if (firstInputChar !== '#'){
			tagProp = '#' + tagProp;
		}

		var userIdProp = req.user['_id'];

		//Check if hashtag is already in the database
		Hashtag.findOne( {'tag': tagProp}, function(err, hashtag){

			//if error, console log the error
			if (err){
				return console.log(err);
			}

			//if hashtag is found
			if (hashtag) {

				console.log('hashtag already exists, checking whether user prop exists: ', hashtag);

				//check whether user is already listed in the hashtag
				//if user is listed, do nothing
				if (hashtag.users.indexOf(userIdProp) > -1) {
					return console.log('hashtag.user already exists');
				}
				//if user is not listed, push to hashtag.users array
				else {

					hashtag.users.push(userIdProp);	
					hashtag.save(function(err, hashtag){ 
						if(err){
							return console.log(err);
						}
						console.log('new user pushed to hashtag.users array');
						res.json(hashtag);
					});

					
				}
			}

			//if hashtag not found, create new hashtag and store in Database
			else {

				//create hashtag
				var newHashtag = new Hashtag();
				newHashtag.tag = tagProp;
				
				//add user as property
				newHashtag.users.push(userIdProp);

				//save hashtag to DB
				newHashtag.save(function(err, hashtag){
					if(err){
						return console.log(err);
					}
					console.log('hashtag saved: ', newHashtag);
					res.json(newHashtag);

					//Retrieve all hashtags from DB
					Hashtag.distinct('tag', function(err, hashtagFilter){
						if(err){
							return console.log(err);
						}

						//Close twitter stream api if open, and reopen with new hashtag filter
						console.log('hashtagfilter from mongoose: ', hashtagFilter);
						tweet.twitterStream(hashtagFilter);

					});
				})
			}
		})
	})
};