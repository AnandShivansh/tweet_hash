var Dashboard = function(){

	//Hashtag array
	var hashtags = [];

	//Hashtags list section
	var hashtagsList = $('#hashtagslist').html();

	//AJAX utility function
	function ajaxCall(url, method, data, cb){

		var returnedData = {};
		var error = undefined;

		$.ajax({
			url: url,
			data: data,
			type: method,
			dataType: "json"
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

	function addHashtag(){
		//Create new hashtag
		var newHashtag = $('#addHashtag').val();

		//Ajax post request to /hashtag route
		ajaxCall('/hashtag', 'POST', newHashtag, function(err, data){
			if(err){
				return console.log(err);
			}
			console.log('ajax ok!');
			//reset input field
			// $('#addHashtag').val('');
			// hashtagsList.append('')
		})
		
	}


	function eventListeners(){

		//Submit hashtag
		$('#addHashtag').on('click', addHashtag);

		//Delete hashtag
		$('#hashtagsList').on('click', '.deleteHashtag', deleteHashtag);

	}

	function init(){
		eventListeners();
	}

init();


}

$(document).ready(function(){
	console.log('client side JS connected!');
	var dashboard = new Dashboard();
});