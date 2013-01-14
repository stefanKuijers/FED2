/* filename: js/models/tournament.js */

(function () {
	"use strict";
	define([
		'config'
	], function (config) {
		var TournamentModel = Backbone.Model.extend({
			// url: config.api + 'tournaments/' + config.tournamentID + "/?callback=?",
			
			initialize: function () {
   				this.fetch();
				
				//this.set({"name":"Blabla"});
 			},

			sync: function(method, model, options) {
				var readData = function (data) {
					this.set(data);
					console.log("Data read", data);
				};
				
				var updateData = function (data) {
					console.log("Data updated", data);
				};
			
				options || (options = {});
			
				switch (method) {
					case "update":
					$.ajax({
				    	// Tournament data
						url: config.api + 'tournaments/' + config.tournamentID,
						headers: {
							"Authorization": "bearer 3437bb36e1"
						},
						success: updateData,
						dataType: 'jsonp',
						context:this
					});
					break;
					
					case "read":
					$.ajax({
				    	// Tournament data
						url: config.api + 'tournaments/' + config.tournamentID + "/?callback=?",
						success: readData,
						context:this
					});
					break;
				}
			},

			defaults: {
				name: 'Leaguevine Tournament',
				scheduling_format: 'Bracket',
				info: '...',
				season: {
					id: 1
				}
			}
		});
		
		return TournamentModel;
	});
}());