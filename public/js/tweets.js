

// //Send message to server
// function sendMessage(socket, message){
// 	socket.emit('wdi:chat:msg', message);
// }

// //listening from server
// function listen(socket){

// 	//listening for message from server
// 	socket.on('wdi:chat:newMsg', function(data){
// 		addMessage(false, data);
// 	});

// 	//listening for location share from server
// 	socket.on('wdi:chat:location', function(data){
// 		console.log("New location",data);
// 		map.setCenter(data.center);
// 		map.setZoom(data.zoom);
// 	});
// }

// //message function to append messages
// function addMessage(myself, message){
// 	if(myself){
// 		$('#chatroom').append('<p class="msg triangle-border right">' + message + '</p>');
// 	} else {
// 		$('#chatroom').append('<p class="msg triangle-border left">' + message + '</p>');
// 	}
// }

$(function(){


	var socket = io();

	//listen(socket);

	console.log('client side socket connected: ', socket);

	socket.emit('connection', 'hello from the client');

	// socket.emit('wdi:user:reply', 'hello from the client');

	// // //Listen for send text butto
	
	// $('#sendText').on('click', function(){
	// 	var message = $('#imText').val();
	// 	if(message == ''){
	// 		return;
	// 	}
	// 	sendMessage(socket, message);
	// 	$('#imText').val('');
	// 	addMessage(true, message);
	// });

	// //Listen for share button
	// $('#share').on('click', function(){
	// 	var mapPosition = {};
	// 	mapPosition.center = map.getCenter();
	// 	mapPosition.zoom = map.getZoom();
	// 	socket.emit('wdi:chat:location', mapPosition);
	// });


});