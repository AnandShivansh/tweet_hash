var tweet = require('../controller/tweets');


module.exports = function(io){
	console.log('server side socket connected');
		





	var usersConnected = 0;

	// Add a connect listener
	io.on('connection', function(socket){

		//Push count of tweets when a new tweet is saved
		//tweetSaved()
		socket.emit('newTweet', function(confirm){


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