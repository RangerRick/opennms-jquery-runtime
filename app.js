var outages=new Outages,alarms=new Alarms,nodes=new Nodes,tabState={outages:{pageId:"outages",url:"#outages"},nodes:{pageId:"nodes",url:"#nodes"},alarms:{pageId:"alarms",url:"#alarms"}},defaultHandler=function(e,t,n,r,i){var s=undefined;r&&(s=$(r).attr("id")),s===undefined&&(s=t[1]);var o=undefined;n&&n.prevPage&&n.prevPage.attr("id")?o=n.prevPage:o=$.mobile.activePage;var u=undefined;o&&o.attr("id")&&(u=o.attr("id"));if(e=="pagebeforechange"){console.log(e+": "+u+" -> "+s);if(o===undefined||u===undefined){console.log(e+": ? -> "+s+": no previous page; skipping");return}if(u!=s){console.log("tabState = "+JSON.stringify(tabState));if(s.startsWith("outages"))if(u.startsWith("outages"))console.log("saving state for outages"),tabState.outages={pageId:s,url:t[0]};else{console.log("pageId = "+tabState.outages.pageId+", toId = "+s);if(tabState.outages.pageId==s)return;i.preventDefault(),$.mobile.changePage(tabState.outages.url)}if(s.startsWith("nodes"))if(u.startsWith("nodes"))console.log("saving state for nodes"),tabState.nodes={pageId:s,url:t[0]};else{console.log("pageId = "+tabState.nodes.pageId+", toId = "+s);if(tabState.nodes.pageId==s)return;i.preventDefault(),$.mobile.changePage(tabState.nodes.url)}if(s.startsWith("alarms"))if(u.startsWith("alarms"))console.log("saving state for alarms"),tabState.alarms={pageId:s,url:t[0]};else{console.log("pageId = "+tabState.alarms.pageId+", toId = "+s);if(tabState.alarms.pageId==s)return;i.preventDefault(),$.mobile.changePage(tabState.alarms.url)}}}},initializeNodeDetails=function(e,t,n,r,i){var s=$.mobile.activePage;if(e=="pagebeforeshow"){var o=t[1],u=router.getParams(t[2]),a=u.nodeId,f=$(r).find(":jqmData(role=footer)");f.find("a").each(function(e){var t=$(this).attr("href");t=="#"+o?($(this).addClass("ui-btn-active"),$(this).addClass("ui-state-persist")):$(this).removeClass("ui-btn-active")});var l=$(r).find(":jqmData(role=header)").find("h1"),c=$(r).find(":jqmData(role=content)");l.html("Node #"+a);var h=nodes.getTemplate(a);c.html(h),nodes.updateNode(a,r,!0)}},initializeAlarmDetails=function(e,t,n,r,i){},refresh=function(e){outages.getOutages(function(e){var t=$("#outage-list");if(!e){console.log("alarm data is empty");return}for(var n in e.outage)n=e.outage[n],t.append('<li><a href="#outages-node-detail?nodeId='+n.serviceLostEvent.nodeId+'">'+n.toListItem()+"</a></li>");t.hasClass("ui-listview")?t.listview("refresh"):console.log("warning: not yet initialized")},e),alarms.getAlarms(function(e){var t=$("#alarm-list");if(!e){console.log("alarm data is empty");return}for(var n in e.alarm)n=e.alarm[n],t.append('<li><a href="#alarms-detail?alarmId='+n["@id"]+'">'+n.toListItem()+"</a></li>");t.hasClass("ui-listview")?t.listview("refresh"):console.log("warning: not yet initialized")},e)},router=new $.mobile.Router([{"#(outages)-node-detail[?](.*)":{handler:initializeNodeDetails,events:"bs"}},{"#(nodes)-node-detail[?](.*)":{handler:initializeNodeDetails,events:"bs"}},{"#(alarms)-detail[?](.*)":{handler:initializeAlarmDetails,events:"bs"}},{"^\\#([^?]*)([?].*?)?$":{handler:defaultHandler,events:"bC"}}]);$(document).ready(function(){refresh(!0)});