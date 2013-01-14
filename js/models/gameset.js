/* filename: js/models/gameset.js */

(function () {
	"use strict";
	define([
		'config'
	], function (config) {
		var GameSet = Backbone.Model.extend({
			defaults: {
				
			},
			
			// Define API url
			url: ,
	
			initialize: function () {
   				/*** Fetch data from API ***/
   				this.fetch();
				
 			}
		});
		
		return GameSet;
	});
}());