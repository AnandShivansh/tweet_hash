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
                // label: "#nike", //generated from clicking on hashtag
                // borderColor: randomColor(), //math random on init
                // fill: false,
                // data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 10, 8, 5, 7, 11, 13, 17, 19, 23, 29]
            },
            {
                // label: "#adidas",
                // backgroundColor: "rgba(255,149,36,0.2)",
                // borderColor: randomColor(),
                // fill: false,
                // data: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 25, 20, 10, 2, 3, 5, 8, 13, 21, 34]
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

	// response = {
	// matchingHashtag: hashtag.tag,
	// tweet: newTweet
	// }

    //update Data whenever incoming tweet saved
    function updateData(response){
    	console.log('update data: ', response);

    	var dataPoint = lineChart.data.datasets.data;

		// Loop over array to match hashtag with label
    	data.datasets.forEach(function(dataset, index){

    		//update dataset for matching hashtag
	    	if (dataset === response.matchingHashtag){
		    	// lineChart.data.labels[i] = 
		    	// lineChart.data.datasets[i].label =

		    	//add count
		    	dataPoint[dataPoint.length - 1]++
		    	lineChart.update();
	    	}
    	})


    }

	// var date = new Date('Sun Feb 10 17:22:56 +0000 2017');

	// var locale = "en-us";
	// var month = date.toLocaleString(locale, { month: "short" });
	// var day = date.getDate().toString();
	// var hour = date.getHours().toString();
	// var min = date.getMinutes().toString();
	// var label = month + " " + day + " " + hour + ":" + min;

	// console.log(label)

    //Initiate chart on user login
    function initChart(){
    	console.log('init chart');

    	//Add dataset for each hashtag currently tracked
    	dashboard.hashtags.forEach(function(hashtag){


    		var newDataset = {
	    		label: hashtag,
	    		borderColor: randomColor(),
	    		fill: false,
	    		data: []
    		}
    		lineChart.data.datasets.push(newDataset);
    		lineChart.update();
    	})
    }

    initChart();

    function addDataset(){
    	event.preventDefault();

    	console.log('add dataset', hashtag);
    }

    function deleteDataset(){
    	event.preventDefault();
    	var hashtagElement = event.target.parentNode.parentNode;
    	var hashtag = hashtagElement.textContent;
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