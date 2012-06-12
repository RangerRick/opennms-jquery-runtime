var outages = new Outages();
var nodes   = new Nodes();

var initializeNodeDetails = function( eventType, matchObj, ui, page, evt ) {
	console.log("eventType = " + eventType);
	console.log("matchObj  = " + matchObj);
	console.log("ui        = " + ui);
	console.log("page      = " + page);
	console.log("event     = " + evt);
	
	var params = router.getParams(matchObj[1]);
	var nodeId = params.nodeId;

	console.log("params.nodeId = " + nodeId);

	var $nodeTitle = $(page).find("#node-title");
	
	console.log("find content");
	var $nodeContent = $(page).find(":jqmData(role=content)");
	
	console.log("set node title");
	$nodeTitle.html("Node #" + nodeId);

	console.log("get template");
	var template = nodes.getTemplate(nodeId);

	console.log("set node content");
	$nodeContent.html(template);

	console.log("update node");
	nodes.updateNode(nodeId, page, true);
	
	console.log("finished");
}

var refresh = function( cache ) {
	outages.getOutages(function( data ) {
		var $outageList = $("#outage-list");
		if (!data) {
			console.log("data is empty");
			return;
		}
		for (var outage in data.outage) {
			outage = data.outage[outage];
			$outageList.append("<li><a href=\"#node-detail?nodeId=" + outage.serviceLostEvent.nodeId + "\">" + outage.toListItem() + "</a></li>");
		}
		if ($outageList.hasClass('ui-listview')) {
			$outageList.listview( 'refresh' );
		} else {
			// $outageList.listview();
		}

		jQuery("abbr.timeago").timeago();
	}, cache);
}
