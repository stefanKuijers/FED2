/* filename: js/models/tournament.js */

(function () {
	"use strict";
	define([
		'config'
	], function (config) {
		var TournamentModel = Backbone.Model.extend({
			//url:config.api + 'tournaments/' + config.tournamentID + "?access_token=e5cd000956",
			//url: config.api + 'tournaments/' + config.tournamentID + "/?callback=?",

			sync: function(method, model, options) {
				var self = this;

				var readData = function (data) {
					self.set(data);
					console.log("Data read", data);
				};

				var updateData = function (data) {
					self.set(data);
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
						dataType: 'json'
					});
					break;

					case "read":
					console.log("Read");
					$.ajax({
				    	// Tournament data
						url: config.api + 'tournaments/' + config.tournamentID + "/?callback=?",
						success: readData,
						dataType: 'json'
					});
					break;

				}
			},

			initialize: function () {
				var self = this;

   				this.fetch();

				this.set({"name":"Blabla"});
				this.save();

				/*
			    $.ajax({
			    	// Tournament data
					url: config.api + 'tournaments/' + config.tournamentID + "/?callback=?",
					// Pool data
					// url: 'https://api.leaguevine.com/v1/pools/?tournament_id=18519&callback=?',
					success: loadData,
					dataType: 'json'
				});*/

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