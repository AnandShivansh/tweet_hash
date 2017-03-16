
$(function(){

	var socket = io();
	console.log('client side socket connected');

//Action event listeners

//Socket event listeners

//functions


	
	

	//Listening for event from server
	socket.on('fromServer', function(data){
		console.log(data);
	});

	//emit object to server
	socket.emit('fromClient', { description: 'event from the client sending over!'});


	//Listener for users entering and leaving
	socket.on('users', function(msg){
		console.log(msg);
	})




});