var outages = new Outages();

var refresh = function(cache) {
	outages.getOutages(function(data) {
		for (outage in data.outage) {
			outage = data.outage[outage];
			$("#outage-list").append("<li><a href=\"#node-" + outage.serviceLostEvent.nodeId + "\">" + outage.toListItem() + "</a></li>");
			$("#outage-list").listview('refresh');
		}
		jQuery("abbr.timeago").timeago();
	}, cache);
}

var startup = function() {
	refresh(true);
}