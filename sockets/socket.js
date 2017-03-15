module.exports = function(io){
	console.log('server side socket connected');
		
	// Add a connect listener
	io.on('connection', function(socket){
	  console.log('a user connected');
	

	    // Disconnect listener
	    socket.on('disconnect', function() {
	        console.log('Client disconnected.');
	    });

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

}