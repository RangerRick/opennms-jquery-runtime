var Nodes = function() {
	var me = this;

	var formatNodeListItem = function() {
		return "" +
			this["@label"];
	};

	var sortByIfIndex = function(a, b) {
		var aIndex = a["@ifIndex"];
		var bIndex = b["@ifIndex"];
		if (aIndex < bIndex) return -1;
		if (aIndex > bIndex) return 1;
		return 0;
	};

	var formatIpInterfaceListItem = function() {
		var item = "<h3>" + this.hostName + "</h3>" +
			"<p>" + this.ipAddress;
		if (this.isManaged == "M") {
			item += " (Managed)";
		}
		item += "</p>";
		
		return item;
	};

	var formatSnmpInterfaceListItem = function() {
		var item = "<h3>";
		var ifIndex = this["@ifIndex"];
		if (this.ifDescr) {
			item += ifIndex + ": " + this.ifDescr;
		} else {
			item += ifIndex;
		}
		item += "</h3>";
		if (this.ifSpeed != 0 && this.ifSpeed != "(null)") {
			item += "<p>" + this.ifSpeed + "</p>";
		}
		
		return item;
	};

	this.getTemplate = function(id) {
		return "" +
			"<h3 id=\"node-label\">Node #" + id + "</h3>" +
			"<div id=\"node-outages\"></div>" +
			"<div id=\"node-ipInterfaces\"></div>" +
			"<div id=\"node-snmpInterfaces\"></div>" +
			"<div id=\"node-events\"></div>";
	};

	this._updateContents = function(page, id, contents) {
		var element = $(page).find(id);
		element.html(contents);
		element.find(':jqmData(role=listview)').each(function(item) {
			if ($(this).hasClass('ui-listview')) {
				$(this).listview( 'refresh' );
			} else {
				$(this).listview();
			}
		});
	}
	this._updateNodeInfo = function(page, data) {
		$(page).find("#node-label").html(data["@label"]);
	};

	this._updateOutageInfo = function(page, data) {
		if (data.outage.length == 0) {
			return;
		}

		var contents = "<ul data-role=\"listview\" data-theme=\"a\">" +
			"<li data-role=\"list-divider\">Outages</li>";

		for (var outageIndex in data.outage) {
			var outage = data.outage[outageIndex];
			contents += "<li>" + outage.toListItem() + "</li>";
		}
		contents += "</ul>";
		
		this._updateContents(page, "#node-outages", contents);
	};

	this._updateIpInterfaceInfo = function(page, data) {
		if (!$.isArray(data.ipInterface)) {
			data.ipInterface = [data.ipInterface];
		}

		if (data.ipInterface.length == 0) {
			return;
		}

		var contents = "<ul data-role=\"listview\" data-theme=\"a\">" +
			"<li data-role=\"list-divider\">IP Interfaces</li>";
		
		for (var ipIndex in data.ipInterface) {
			var ipInterface = data.ipInterface[ipIndex];
			ipInterface.toListItem = formatIpInterfaceListItem;
			contents += "<li>" + ipInterface.toListItem() + "</li>";
		}
		contents += "</ul>";

		this._updateContents(page, "#node-ipInterfaces", contents);
	};

	this._updateSnmpInterfaceInfo = function(page, data) {
		if (!$.isArray(data.snmpInterface)) {
			data.snmpInterface = [data.snmpInterface];
		}

		if (data.snmpInterface.length == 0) {
			return;
		}
		data.snmpInterface.sort(sortByIfIndex);

		var contents = "<ul data-role=\"listview\" data-theme=\"a\">" +
			"<li data-role=\"list-divider\">SNMP Interfaces</li>";

		for (var snmpIndex in data.snmpInterface) {
			var snmpInterface = data.snmpInterface[snmpIndex];
			snmpInterface.toListItem = formatSnmpInterfaceListItem;
			contents += "<li>" + snmpInterface.toListItem() + "</li>";
		}
		contents += "</ul>";

		this._updateContents(page, "#node-snmpInterfaces", contents);
	};

	this.updateNode = function(nodeId, page, cache) {
		if (cache === undefined) {
			cache = true;
		}
		
		console.log("updateNodeInfo");
		$.ajax({
			url: getUrl("nodes/" + nodeId),
			cache: cache,
			dataType: "json",
		}).done(function(data) {
			me._updateNodeInfo(page, data);
		});

		console.log("updateOutageInfo");
		$.ajax({
			url: getUrl("outages/forNode/" + nodeId),
			data: {
				limit: 50,
				orderBy: "ifLostService",
				order: "desc"
			},
			cache: cache,
			dataType: "json",
		}).done(function(data) {
			me._updateOutageInfo(page, outages.processOutages(data));
		});
		
		console.log("updateIpInterfaceInfo");
		$.ajax({
			url: getUrl("nodes/" + nodeId + "/ipinterfaces"),
			cache: cache,
			dataType: "json",
			data: {
				orderBy: [ "ipHostName", "ipAddress" ]
			}
		}).done(function(data) {
			me._updateIpInterfaceInfo(page, data);
		});
		
		console.log("updateSnmpInterfaceInfo");
		$.ajax({
			url: getUrl("nodes/" + nodeId + "/snmpinterfaces"),
			cache: cache,
			dataType: "json",
			data: {
				orderBy: [ "ifName", "ipAddress", "ifDesc" ]
			}
		}).done(function(data) {
			me._updateSnmpInterfaceInfo(page, data);
		});
	};

	this.getNodes = function(callback, cache) {
		if (cache === undefined) {
			cache = true;
		}

		$.ajax({
			url: getUrl("nodes"),
			cache: cache,
			dataType: "json",
			data: {
				limit: 0,
				orderBy: [ "label", "id" ],
				order: "asc"
			}
		}).done(function(data) {
			for (var nodeIndex in data.node) {
				data.node[nodeIndex].toListItem = formatNodeListItem;
			}
			callback(data);
		});
	};
}