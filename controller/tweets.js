var mongoose = require('mongoose');
var Tweet = require('../models/tweet');
var apiKey = require('../config.json');

module.exports = function(app){

	console.log('connected to tweet controller');

	// Create twit object
	var Twit = require('twit');

	//Set api keys and tokens
	var T = new Twit({
	  consumer_key:         apiKey.twitter.consumerKey,
	  consumer_secret:      apiKey.twitter.consumerSecret,
	  access_token:         apiKey.twitter.accessToken,
	  access_token_secret: 	apiKey.twitter.accessTokenSecret,
	  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	})


	 //filter twitter hashtags public stream
	var hashtagFilter = ['#nike', '#tesla', '#apple'];

	//Default twitterStream to false when no hashtags are stored
	if (hashtagFilter === []){
		twitterStream = false;
	} else {
		twitterStream = true;
	}

	var twitterStream = false;	

	//When twitterstream init, start streaming
	if(twitterStream){
		console.log('streaming tweets....');

		var stream = T.stream('statuses/filter', { track: hashtagFilter })
		 
		stream.on('tweet', function (tweet) {
			console.log('*************incoming********\n', tweet,
				'\n*********end*********');

			//create tweet objects
			// var newTweet = new Tweet();
			// newTweet.tag = 
			// newTweet.geo =
			// newTweet.created =

			//save incoming tweets to DB
			// tweet.save(function(err, tweet){
			// 	if(err){
			// 		return console.log(err);
			// 	}
			// 	console.log('new tweet saved to DB');
			// })
		})


	}





}