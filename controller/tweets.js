var mongoose = require('mongoose');
var Tweet = require('../models/tweet');
var Hashtag = require('../models/hashtag');
var apiKey = require('../config.json');

console.log("Hello from tweet controller");

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

exports.twitterStream = function(streaming, filter){

	var streamOn = streaming;

	//When twitterStream init, start streaming
	if(streamOn){

		var hashtagFilter = filter;
		
		console.log('hashagfilter: ', filter);

		var stream = T.stream('statuses/filter', { track: filter })
		 
		stream.on('tweet', function (tweet) {

			console.log('streaming tweets....');

			//Exclude all tweets with undefined hashtag
			//filter all hashtags out and concat #
			if (tweet.entities.hashtags !== undefined){
				var hashtagFilterNormalised = tweet.entities.hashtags.map(function(hashtag){
					return '#' + hashtag.text.toLowerCase();
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
	} else {
		console.log('Twitter Stream API turned off');
	}
}