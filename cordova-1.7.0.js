var intervalID = window.setInterval(
	function() {
		window.clearInterval(intervalID);
		$(document).trigger('deviceready');
	},
	1000
);
