/* filename: js/models/tournament.js */

(function () {
	"use strict";
	define([
		'config'
	], function (config) {
		var TournamentModel = Backbone.Model.extend({
			defaults: {
				name: 'Leaguevine Tournament',
				scheduling_format: 'Bracket',
				info: '...',
				season: {
					id: 1
				}
			},
			
			// Define API url
			url: config.api + 'tournaments/' + config.tournamentID + '/?callback=?',
			
			/*
			// Fetch data with custom $.ajax request
			loadData: function(data) {
				this.set(data);
			},
			*/
			
			initialize: function () {
   				/*** Fetch data from API ***/
   				this.fetch();
				
				/*				
			    $.ajax({
					url: config.api + 'tournaments/' + config.tournamentID + '/?callback=?',
					context:this,
					success: this.loadData,
					dataType: 'json'
				});
				*/
				
				
				/*** Save data to API ***/
				/*
				// Get code
				$.urlParam = function(name){
				    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
				    if (!results)
				    { 
				        return 0; 
				    }
				    return results[1] || 0;
				};
				
				var code = $.urlParam('code');

				if (!code) {
					window.location.href = config.oAuthUri +"authorize/?client_id="+ config.clientID +"&response_type=code&redirect_uri="+ config.redirectUri +"&scope=universal"
				}
				
				var getAccessToken = function(data) {
					this.url = config.api + 'tournaments/' + config.tournamentID + '/?access_token=' + data.access_token;

					// Set & save name
					this.set({"name":"Dodge it better"});
					this.save();
				}

			    $.ajax({
					url: config.oAuthUri +"token/?client_id="+ config.clientID +"&client_secret="+ config.clientSecret + "&code="+ code +"&grant_type=authorization_code&redirect_uri="+ config.redirectUri,
					context:this,
					success: getAccessToken,
					dataType: 'jsonp'
				});
				*/
 			}
		});
		
		return TournamentModel;
	});
}());