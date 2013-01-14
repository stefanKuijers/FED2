/* filename: js/models/empty.js */

(function () {
	"use strict";
	define([
		'config'
	], function (config) {
		var aModel = Backbone.Model.extend({
			defaults: {
				
			},
			
			// Define API url
			url: ,
	
			initialize: function () {
   				/*** Fetch data from API ***/
   				this.fetch();
				
 			}
		});
		
		return aModel;
	});
}());