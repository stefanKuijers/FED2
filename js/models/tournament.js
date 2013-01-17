/* filename: js/models/tournament.js */

(function () {
	"use strict";
	define([
		'config'
	], function (config) {
		var TournamentModel = Backbone.Model.extend({
			

			initialize: function (options) {
				this.vent = options.vent;

   				var modelScope = this;

				var loadData = function (o) {
					console.log("data loaded:", o);

					var keys = []; for(var k in o) {modelScope[k] = o[k];}

					modelScope.vent.trigger('dataLoaded', modelScope);
					//scope.set(o);
				};

			    $.ajax({
			    	// Tournament data
					url: config.api + 'tournaments/' + this.id + "/?callback=?",
					
					// Pool data
					// url: 'https://api.leaguevine.com/v1/pools/?tournament_id=18519&callback=?',
					success: loadData,
					dataType: 'json'
				});

 			},

			defaults: {
				name: 'Leaguevine Tournament',
				scheduling_format: 'Bracket',
				info: '...'
			}
		});
		
		return TournamentModel;
	});
}());