//When user is logged in
var Dashboard = function(){

	//Hashtag array
	var hashtags = [];

	//Hashtags list section
	var hashtagTemplate = $('#hashtagTemplate').html();

	//Rendering
	function render(){
		console.log('render ok');

		$('#hashtagsBox').html('');
		//append user hashtags to list
		hashtags.forEach(function(hashtag){
			var hashtagHTML = hashtagTemplate;
			hashtagHTML = hashtagHTML.replace("{{hashtagName}}", hashtag.tag);
			hashtagHTML = hashtagHTML.replace("{{id}}", hashtag._id);
			$('#hashtagsBox').append(hashtagHTML);
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

		console.log('listhashtag function init');
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
					return console.log('ajax post error', err);
				}
				console.log('ajax post ok: ', data);

				//reset input field
				$('#hashtagName').val('');
				listHashtags();

			
			//Ajax post request to initiate Twitter REST API search (past 7 days)


			})

		}
	}

	//Delete hashtag
	function deleteHashtag(event){
		event.preventDefault();

		var hashtagElement = event.target.parentNode.parentNode;

		var id = encodeURIComponent(hashtagElement.textContent);

		console.log(id);

		//AJAX post request to /hashtag route to 
		//delete hashtag from DB
		ajaxCall('/hashtag/' + id, 'DELETE', {}, function(err, data){
			if (err){
				return console.log('ajax delete err: ', err);
			}

			console.log('ajax delete ok', data);
			listHashtags();
			console.log(listHashtags);
		})
	}

	function eventListeners(){

		//Submit hashtag
		$('#addHashtag').on('click keypress', addHashtag);

		//Delete hashtag
		$('#hashtagsBox').on('click', '.deleteButton', function(event){
			deleteHashtag(event);
			deleteDataset(event);
		});
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