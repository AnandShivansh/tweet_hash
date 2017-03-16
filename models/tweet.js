var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
	tag: Array,
	created: String
});


var Tweet = mongoose.model('Tweet', tweetSchema);



module.exports = Tweet;