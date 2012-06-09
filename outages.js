var Outages = function() {
	var formatOutageListItem = function() {
		return "" +
			"<h3>" + this.ipAddress + "/" + this.monitoredService.serviceType.name + "</h3>" +
			"<p>" + this.serviceLostEvent.logMessage + "</p>" +
			"<p class=\"ui-li-aside\"><abbr class=\"timeago\" title=\"" + this.ifLostService + "\">" + parseDate(this.ifLostService) + "</abbr></p>";
	};

	this.init = function() {
		
	};

	this.getOutages = function(callback, cache) {
		if (cache === undefined) {
			cache = true;
		}

		$.ajax({
			url: "/opennms/rest/outages",
			cache: cache,
			dataType: "json",
			data: {
				limit: 50,
				orderBy: "ifLostService",
				order: "desc",
				ifRegainedService: "null"
			}
		}).done(function(data) {
			for (var outageIndex in data.outage) {
				var outage = data.outage[outageIndex];
				outage.toListItem = formatOutageListItem;
			}
			callback(data);
		});
	};

	this.init();
}