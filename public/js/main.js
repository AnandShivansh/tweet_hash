var Dashboard = function(){



	function eventListeners(){
		//add hashtag bar
		$('#addHashtag').click(function(e){
			e.preventDefault();
			console.log('ok!');
		})
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