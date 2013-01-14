/* filename: js/router.js */

(function () {
	"use strict";
	define([
		'config',
		'models/tournament',
		'views/home/home',
		'views/tournament/tournament',
		'views/tournament/schedule',
		'views/tournament/ranking',
		'views/tournament/game'
		
	], function (config, TournamentModel, homeView, TournamentView, scheduleView, rankingView, gameView) {
		var AppRouter = Backbone.Router.extend({
			tournamentView:"",
			
			// Define routes to pages (hash urls #/page_name)
			routes: {
				// Define some URL routes
				'tournament':   'showTournament',
				'ranking'	: 	'showRanking',
				'schedule'	:   'showSchedule',
				'game'		:   'showGame',

				// Default
				'*path': 'defaultAction'
			},

			showTournament: function (actions) {
				var tournamentModel = new TournamentModel();
				this.tournamentView = new TournamentView({model: tournamentModel});
				this.tournamentView.render();
			},

			showSchedule: function (actions) {
				scheduleView.render();
			},

			showRanking: function (actions) {
				rankingView.render();
			},

			showGame: function (actions) {
				gameView.render();
			},

			defaultAction: function (actions) {
				homeView.render();
			}
		});

		var initialize = function () {
			var app_router = new AppRouter();
			Backbone.history.start();
		};

		return {
			initialize: initialize
		};
	});
}());