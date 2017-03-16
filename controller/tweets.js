var mongoose = require('mongoose');
var Tweet = require('../models/tweet');
var Hashtag = require('../models/hashtag');
var apiKey = require('../config.json');


exports.twitterStream = function() {

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

	//Set hashtagFilter 
	var hashtagFilter;

	// Retrieve all hashtag.tag from DB
	Hashtag.distinct('tag', function(err, hashtags){
		if (err) {
			return console.log(err);
		}
		//filter twitter hashtags public stream from DB
		hashtagFilter = hashtags;
	});

	//console.log(hashtagFilter);

	//Default twitterStream to false when no hashtags are stored
	// if (hashtagFilter === []){
	// 	twitterStream = false;
	// } else {
	// 	twitterStream = true;
	// }

	this.on = true;	

	//When twitterstream init, start streaming
	if(this.on){
		console.log('streaming tweets....');

		var stream = T.stream('statuses/filter', { track: hashtagFilter })
		 
		stream.on('tweet', function (tweet) {

			//Exclude all tweets with undefined hashtag
			//filter all hashtags out and concat #
			if (tweet.entities.hashtags !== undefined){
				var hashtagFilterNormalised = tweet.entities.hashtags.map(function(object){
					return '#' + object.text.toLowerCase();
				})	
	
				//create tweet objects
				var newTweet = new Tweet();
				newTweet.created = tweet.created_at
				newTweet.tag = hashtagFilterNormalised;

				//check with matching hashtag name in mongodb => returns an ARRAY of all matching hashtags
				Hashtag.find( {'tag': { $in: hashtagFilterNormalised } }, function(err, matchingHashtag){

					if (err){
						return console.log(err);
					}

					//loop through all matching hashtags
					matchingHashtag.forEach(function(hashtag){
			
						//push tweets to matching hashtag
						hashtag.tweets.push(newTweet);

						//save incoming tweet to DB
						hashtag.save(function(err, hashtag){
						if(err){
							return console.log(err);
						}
						console.log('new tweet saved to DB');
						})
					})
				})
			}
		})
	}
}