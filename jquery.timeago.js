/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 0.11.3
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2012, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */(function(e){function n(){var t=r(this);return isNaN(t.datetime)||e(this).text(i(t.datetime)),this}function r(n){n=e(n);if(!n.data("timeago")){n.data("timeago",{datetime:t.datetime(n)});var r=e.trim(n.text());r.length>0&&(!t.isTime(n)||!n.attr("title"))&&n.attr("title",r)}return n.data("timeago")}function i(e){return t.inWords(s(e))}function s(e){return(new Date).getTime()-e.getTime()}e.timeago=function(t){return t instanceof Date?i(t):typeof t=="string"?i(e.timeago.parse(t)):typeof t=="number"?i(new Date(t)):i(e.timeago.datetime(t))};var t=e.timeago;e.extend(e.timeago,{settings:{refreshMillis:6e4,allowFuture:!1,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",wordSeparator:" ",numbers:[]}},inWords:function(t){function l(r,i){var s=e.isFunction(r)?r(i,t):r,o=n.numbers&&n.numbers[i]||i;return s.replace(/%d/i,o)}var n=this.settings.strings,r=n.prefixAgo,i=n.suffixAgo;this.settings.allowFuture&&t<0&&(r=n.prefixFromNow,i=n.suffixFromNow);var s=Math.abs(t)/1e3,o=s/60,u=o/60,a=u/24,f=a/365,c=s<45&&l(n.seconds,Math.round(s))||s<90&&l(n.minute,1)||o<45&&l(n.minutes,Math.round(o))||o<90&&l(n.hour,1)||u<24&&l(n.hours,Math.round(u))||u<42&&l(n.day,1)||a<30&&l(n.days,Math.round(a))||a<45&&l(n.month,1)||a<365&&l(n.months,Math.round(a/30))||f<1.5&&l(n.year,1)||l(n.years,Math.round(f)),h=n.wordSeparator===undefined?" ":n.wordSeparator;return e.trim([r,c,i].join(h))},parse:function(t){var n=e.trim(t);return n=n.replace(/\.\d\d\d+/,""),n=n.replace(/-/,"/").replace(/-/,"/"),n=n.replace(/T/," ").replace(/Z/," UTC"),n=n.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),new Date(n)},datetime:function(n){var r=t.isTime(n)?e(n).attr("datetime"):e(n).attr("title");return t.parse(r)},isTime:function(t){return e(t).get(0).tagName.toLowerCase()==="time"}}),e.fn.timeago=function(){var e=this;e.each(n);var r=t.settings;return r.refreshMillis>0&&setInterval(function(){e.each(n)},r.refreshMillis),e},document.createElement("abbr"),document.createElement("time")})(jQuery);