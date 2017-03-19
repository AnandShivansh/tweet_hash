
$(function(){

	//io.connect('http://localhost:3000')
	var socket = io();
	console.log('client side socket connected');

	//Listening for new tweets
	socket.on('newTweet', function(newTweet){
		updateData(newTweet);
	})
		
	
// ChartJS
    var data = {
        labels: ['Feb 3', 'Feb 4', 'Feb 5', 'Feb 6', 'Feb 7', 'Feb 8', 'Feb 9', 'Feb 10', 'Feb 11', 'Feb 12', 'Feb 13', 'Feb 14', 'Feb 15', 'Feb 16', 'Feb 17', 'Feb 18', 'Feb 19', 'Feb 20', 'Feb 21', 'Feb 22'],
        datasets: [
            {
                label: "#Nike", //generated from clicking on hashtag
                borderColor: "rgb(14,75,205)", //math random on init
                fill: false,
                //generate initial data pulled from DB
                data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 10, 8, 5, 7, 11, 13, 17, 19, 23, 29]
            },
            {
                label: "#Adidas",
                //backgroundColor: "rgba(255,149,36,0.2)",
                borderColor: "rgb(255,149,36)",
                fill: false,
                data: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 25, 20, 10, 2, 3, 5, 8, 13, 21, 34]
            }
        ]
    };
    var ctx = $('#lineChart');
    var options = { };
    var lineChart = new Chart(ctx, {
	    type: 'line',
	    data: data,
	    options: options
	});

    //update Data whenever incoming tweet saved
    function updateData(newTweet){
    	console.log(newTweet);
    }


	//Listening for event from server
	// socket.on('fromServer', function(data){
	// 	console.log(data);
	// });

	// //emit object to server
	// // socket.emit('fromClient', { description: 'event from the client sending over!'});


	// //Listener for users entering and leaving
	// socket.on('users', function(msg){
	// 	console.log(msg);
	// })




});