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

var currentLabels = [];
    
    var generateLabel = function(time){
        var locale = "en-us";
        var month = time.toLocaleString(locale, { month: "short" });
        var day = time.getDate().toString();
        var hour = time.getHours().toString();
        var min = time.getMinutes().toString();
        min = (Math.round(min/1) * 1) % 60; //round to nearest 5 minutes
        if (min.toString().length == 1){ //format minute to always be 2 digits
            min = '0' + min
        }
        hour = min > 52 ? (hour === 23 ? 0 : ++hour) : hour; //round off hours
        var label = month + " " + day + " " + hour + ":" + min;
        return label;
    }
    
    var date = new Date();
    
    //generate 10 labels for draft
    // for(var i = 0; i<1; i++){
    //     currentLabels.push(generateLabel(date));
    //     date.setMinutes(date.getMinutes() + 5);
    // }

    currentLabels.push(moment().format('MMM Do, h:mm a'));

    
    var data = {
        labels: currentLabels,
        datasets: []
    };

    var ctx = $('#lineChart');
    var options = { 
        scales: {
            yAxes: [{
                ticks: {
                    // fixedStepSize: 5,
                    min: 0,
                }
            }]
        }
    };

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

    	var dataPoint = lineChart.data.datasets;

		// Loop over array to match hashtag with label
    	dataPoint.forEach(function(dataset, index){

    		//update dataset for matching hashtag
	    	if (dataset.label === response.matchingHashtag){

                //create time label
				var newLabel = response.tweet.created;
				
                //if latest label time does not match datapoint to be plotted,
                //generate a new label and push a new element to datapoint array
				if (currentLabels.indexOf(newLabel) < 0){
					
//if label is found is currentLabel, add existing
//if no lable is found in currentLabel, add new label

					// ADD 'label' into dataSet-Labels and currentLabels.
                    currentLabels.push(newLabel);
                    console.log("Add new label", newLabel);

                    //Shift datapoints for all datasets to the next element in the array
                    dataPoint.forEach(function(dataset){
                        dataset.data.push(0);
                    })

                    dataPoint[index].data[dataPoint[index].data.length-1] += 1;
                    console.log('Pushing datapoint');
				}

                //if latest label time matches datapoint to be plotted,
                //simply add count to last element of datapoint array
                else{

    		    	//add count
                    // Fix NaN issue
    		    	if (dataPoint[index].data.length <= 0) {
                        console.log('pushing datapoint');
                        dataPoint[index].data.push(0);
                        dataPoint[index].data[dataPoint[index].data.length-1] += 1;
                    } else {
                        console.log('adding count to existing datapoint');
                        dataPoint[index].data[dataPoint[index].data.length-1] += 1;
                    }
                }
		    	lineChart.update();
	    	}
    	})

        //clear out unused x-axis

            //check within each dataset.data
            //If ALL the first element in dataset.data === null, then slice data and currentLabels

    }

    //Initiate chart on user login
    function initChart(userHashtags){
    	console.log('init chart');

       // //loop through each userHashtags
       // userHashtags.forEach(function(hashtag){
       //      //loop through each tweet
       //      hashtag.tweets.forEach(function(tweet){
       //          //parse generateLabel function to normalise labels
       //          var label = generateLabel(tweet.created);
       //          console.log(label);
       //      })


       // }) 



    	//Add dataset for each hashtag currently tracked
    	dashboard.hashtags.forEach(function(hashtag){

    		var newDataset = {
	    		label: hashtag.tag,
	    		borderColor: randomColor(),
	    		fill: false,
	    		data: [] //to edit so that it will retrieve past data in DB
    		}
    		lineChart.data.datasets.push(newDataset);
    		lineChart.update();
    	})
    }
    
    function addDataset(hashtag){

        //generate a datapoint array with a value pushed to the last index
        var newestDataPoint = [];
        currentLabelsLength = currentLabels.length - 1;

        for(var x = 0; x < currentLabelsLength; x++){
            newestDataPoint.push(null);
        }

        newestDataPoint.push(0);

        var newDataset = {
            label: hashtag.tag,
            borderColor: randomColor(),
            fill: false,
            data: newestDataPoint //to start tracking datapoint on latest currentLabel

        }

        lineChart.data.datasets.push(newDataset);
        lineChart.update();
    	console.log('add dataset', lineChart.data.datasets);
    }

    function deleteDataset(){
    	event.preventDefault();
    	var hashtagElement = event.target.parentNode.parentNode;
    	var hashtag = hashtagElement.textContent;

        //loop through dataset, delete matching dataset
        lineChart.data.datasets.forEach(function(dataset, index){
            if(hashtag === dataset.label){
                lineChart.data.datasets.splice(index, 1);
                console.log('deleted dataset: ', lineChart.data.datasets);
                lineChart.update();
            }
        })
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

