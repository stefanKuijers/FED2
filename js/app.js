/* filename: js/app.js */

(function () {
	"use strict";
	define([
		'router' // Request router.js
	], function (Router) {
		var initialize = function () {
			// Pass in our Router module and call it's initialize function
			//console.log("aha:", Router);
			Router.initialize();
			//console.log("aha:", Router);
		}

		return {
			initialize: initialize
		};
	});
}());