var tweet = require('../controller/tweets');


module.exports = function(io){
	console.log('server side socket connected');
		
	var usersConnected = 0;

	// Add a connect listener
	io.on('connection', function(socket){
		
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

    
		// //Listener for msg emit from client
		// client.on('wdi:chat:msg', function(data){
		// 	//io.emit('wdi:chat:newMsg', data); 			//broadcast to everyone
		// 	client.broadcast.emit('wdi:chat:newMsg', data)	//broad to everyone except the sender
		// });

		// //Listener for location emit from client
		// client.on('wdi:chat:location', function(data){
		// 	//io.emit('wdi:chat:location', data); 			//broadcast to everyone
		// 	client.broadcast.emit('wdi:chat:location', data)//broad to everyone except the sender
		// });

		// //Disconnect listener
		// client.on('disconnect', function(){
		// 	console.log('client disconnected');
		// });

		// // Setup events
		// client.on('wdi:user:reply', function(data){
		// console.log(data);
		// });
	});	
}