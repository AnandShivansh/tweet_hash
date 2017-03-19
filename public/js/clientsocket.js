//Socket.io event listeners
$(function(){

	//io.connect('http://localhost:3000')
	var socket = io();
	console.log('client side socket connected');

	//Listening for new tweets
	socket.on('newData', function(response){
		updateData(response);
	})

	//Listening for hashtags to track
	//$('.hashtag').on('click', addDataset);

});
		
	
// ChartJS
//var Chart = function(){

    var data = {
        labels: ['Feb 3', 'Feb 4', 'Feb 5', 'Feb 6', 'Feb 7', 'Feb 8', 'Feb 9', 'Feb 10', 'Feb 11', 'Feb 12', 'Feb 13', 'Feb 14', 'Feb 15', 'Feb 16', 'Feb 17', 'Feb 18', 'Feb 19', 'Feb 20', 'Feb 21', 'Feb 22'],
        datasets: [
            {
                label: "#nike", //generated from clicking on hashtag
                borderColor: randomColor(), //math random on init
                fill: false,
                //generate initial data pulled from DB
                data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 10, 8, 5, 7, 11, 13, 17, 19, 23, 29]
            },
            {
                label: "#adidas",
                //backgroundColor: "rgba(255,149,36,0.2)",
                borderColor: randomColor(),
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
    function updateData(response){
    	console.log('update data: ', response);

    	// Loop over array to match hashtag with label and update data
    	// data.labels[i] = 
    	// data.datasets[i].label =
    	// data.datasets.data[i] =
    	// lineChart.update();
    }

    //
    function initChart(newTweet){
    	console.log('add dataset: ', newTweet);
    	//new dataset
    	var newDataset = {
    		// label:
    		// borderColor: randomColor();
    		// fill: false,
    		// data:
    	}
    	data.datasets.push(newDataset);
    }

    function addDataset(hashtag){

    }

    function deleteDataset(hashtag){
    	event.preventDefault();
    	console.log('delete dataset', hashtag);

    }

    //random color generator
    function randomColor(){
    	var r = Math.floor(Math.random()*256);       
		var g = Math.floor(Math.random()*256);     
		var b = Math.floor(Math.random()*256);      
		var rgb = 'rgb(' + r + ',' + g + ',' + b + ')'; 
		return rgb;
    }
// }

// var chart = new Chart();