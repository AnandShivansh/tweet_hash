var tweet = require('../controller/tweets');

exports.tweetSaved = function(newTweet){


}

module.exports = function(io){
	console.log('server side socket connected');

	// Add a connect listener
	io.on('connection', function(socket){

	//Push tweet to client-side when a new tweet is saved
	//event listener for when hashtag is saved??
		socket.emit('newTweet', function(confirm){
			//emit new tweets to client
		})
		
		//Push count of tweets when a new hashtag is added
		//hashtagAdded()
		socket.emit('newHashtag', function(confirm){

		})




		usersConnected++;

	 	//Emit number of users connected to client
		io.sockets.emit('users', { description: usersConnected + ' users conneceted'});
	  	
		//Emit object to client
		//socket.emit('fromServer', { description: 'A custom event named testerEvent!'});
		
		//Listening for event from client
		// socket.on('fromClient', function(msg){
		// 	console.log(msg);
		// });
		
	    // Disconnect listener
	    socket.on('disconnect', function() {
	        usersConnected--;
	        io.sockets.emit('users', { description: usersConnected + ' users left'});

	    });

    

	});	
}