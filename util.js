var parseDate = function(dateString) {
	var parts = dateString.match(/^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):([\d\.]+)([\+\-](\d\d):(\d\d))?$/);
	var year = parts[1];
	var month = parts[2] - 1;
	var day = parts[3];
	var hours = parts[4];
	var minutes = parts[5];
	var seconds = parts[6];
	var milliseconds = 0;

	var secondParts = seconds.match(/^(\d+)\.(\d+)$/);
	if (secondParts) {
		seconds = secondParts[1];
		milliseconds = secondParts[2];
	}

	console.log("year = " + year + ", month = " + month + ", day = " + day + ", hours = " + hours + ", minutes = " + minutes + ", seconds = " + seconds + ", milliseconds = " + milliseconds);
	var date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
	return date;
}