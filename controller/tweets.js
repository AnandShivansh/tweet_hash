var mongoose = require('mongoose');
var Tweet = require('../models/tweet');
var Hashtag = require('../models/hashtag');
var apiKey = require('../config.json');
var moment = require('moment');

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

var filter = [];

var stream = null;

exports.twitterStream = function(filter, io){

	if (stream !== null){
		stream.stop();
		console.log('Stream stop and restarting with new filter');
	}

	stream = T.stream('statuses/filter', { track: filter });

	//When twitterStream init, start streaming
	stream.on('tweet', function (tweet) {

		if(filter !== []){

			console.log('streaming tweets....');

			console.log('tweet hashtags: ', tweet.entities.hashtags);

			console.log('hashtagfilter: ', filter);

			//Exclude all tweets with undefined hashtag
			//filter all hashtags out and concat #
			if (tweet.entities.hashtags !== undefined){
				var hashtagFilterNormalised = tweet.entities.hashtags.map(function(hashtag){
					return '#' + hashtag.text.toLowerCase();
				})	
	
				//create tweet objects
				var newTweet = new Tweet();
				newTweet.created = moment().format('MMM Do, h:mm a');
				newTweet.text = tweet.text;
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

						//emit new Data to client side
						response = {
							matchingHashtag: hashtag.tag,
							tweet: newTweet
						}

						io.emit('newData', response);

						})
					})
				})
			}
		}
	})
}