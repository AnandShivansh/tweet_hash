var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
	tag: Array,
	text: String,
	created: String
});


var Tweet = mongoose.model('Tweet', tweetSchema);



module.exports = Tweet;