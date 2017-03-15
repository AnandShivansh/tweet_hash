var mongoose = require('mongoose');

var hashtagSchema = new mongoose.Schema({
	tag: {type: String, unique: true},
	users: Array,
	tweets: Array,
	created: {type: Date, default: Date.now}
});


var Hashtag = mongoose.model('Hashtag', hashtagSchema);



module.exports = Hashtag;