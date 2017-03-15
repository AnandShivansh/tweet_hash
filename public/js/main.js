//When user is logged in
var Dashboard = function(){

	//Initiate Twitter Stream API


	//Hashtag array
	var hashtags = [];

	//Hashtags list section
	var hashtagsList = $('#hashtagsList').html();

	//Rendering
	function render(){
		console.log('render ok');
		console.log(hashtagsList);

		//append user hashtags to list
		hashtags.forEach(function(hashtag){
			console.log(hashtag.tag);

		});

	}

	//AJAX utility function
	function ajaxCall(url, method, data, cb){

		var returnedData = {};
		var error = undefined;

		$.ajax({
			url: url,
			data: data,
			type: method,
			dataType: 'json'
		})
			.done(function(json){
				returnedData = json;
			})
			.fail(function(xhr, status, err){
				console.log('Error: ', err);
				error = err;
			})
			.always(function(xhr, status){
				cb(error, returnedData);
			})
	}

	//Read hashtags
	function listHashtags(){

		//Ajax get request to /hashtag route
		ajaxCall('/hashtag', 'GET', {}, function(err, data){
			if (err){
				return console.log(err);
			}
			console.log('ajax ok!');
			//data parsed from JSON into Objects
			//Set hashtags array equal to database
			hashtags = data;
			console.log('json retrieved: ', hashtags);

			render();
		});

	}

	//Create hashtag
	function addHashtag(event){
		event.preventDefault();

		if (event.type === 'click' || event.which === 13) {
			//Create new object
			var hashtagName = $('#hashtagName').val();

			var newHashtag = {};
			newHashtag.tag = hashtagName;

			//Ajax post request to /hashtag route to add to DB
			ajaxCall('/hashtag', 'POST', newHashtag, function(err, data){
				if(err){
					return console.log(err);
				}
				console.log('ajax post ok: ', data);

				//reset input field
				$('#hastagName').val('');

			//Ajax post request to initiate Twitter REST API search (past 7 days)


			})
		}
	}

	//Delete hashtag

		//AJAX post request to /hashtag route to 
		//delete hashtag and all tweets from DB




	function eventListeners(){

		//Submit hashtag
		$('#addHashtag').on('click keypress', addHashtag);

		//Delete hashtag
		//$('#hashtagsList').on('click', '.deleteHashtag', deleteHashtag);

	}

	function init(){
		eventListeners();
		listHashtags();
	}

init();


}

$(document).ready(function(){
	console.log('client side JS connected!');
	var dashboard = new Dashboard();
});