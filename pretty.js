/*
 * JavaScript Pretty Date
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(e){var t=new Date((e||"").replace(/-/g,"/").replace(/[TZ]/g," ")),n=((new Date).getTime()-t.getTime())/1e3,r=Math.floor(n/86400);if(isNaN(r)||r<0||r>=31)return;return r==0&&(n<60&&"just now"||n<120&&"1 minute ago"||n<3600&&Math.floor(n/60)+" minutes ago"||n<7200&&"1 hour ago"||n<86400&&Math.floor(n/3600)+" hours ago")||r==1&&"Yesterday"||r<7&&r+" days ago"||r<31&&Math.ceil(r/7)+" weeks ago"}typeof jQuery!="undefined"&&(jQuery.fn.prettyDate=function(){return this.each(function(){var e=prettyDate(this.title);e&&jQuery(this).text(e)})});