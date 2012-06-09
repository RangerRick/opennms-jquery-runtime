var Nodes = function() {
	var formatNodeListItem = function() {
		return "" +
			"<h3>" + this.id + "</h3>";
	};

	this.init = function() {
	};

	this.getNode = function(callback, id, cache) {
		if (cache === undefined) {
			cache = true;
		}
		
		$.ajax({
			url: "/opennms/rest/nodes/" + id,
			cache: cache,
			dataType: "json",
		}).done(callback);
	};

	this.getNodes = function(callback, cache) {
		if (cache === undefined) {
			cache = true;
		}

		$.ajax({
			url: "/opennms/rest/nodes",
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

	this.init();
}