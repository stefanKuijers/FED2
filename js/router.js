/* filename: js/router.js */

(function () {
	"use strict";
	define([
		'config',
		'models/tournament',
		'views/home/home',
		'views/tournament/tournament',
		'views/ranking/PoolView',
		'views/game/GameResult',
		'views/game/GameWinner',
		'views/schedule/scheduleView'
	], function (config, TournamentModel, homeView, TournamentView, PoolView, GameView, GameWinner, ScheduleView) { 
		var AppRouter = Backbone.Router.extend({

			routes: {
				'/tournament'	: 'showTournament',
				'/schedule'		: 'showSchedule',
				'/ranking'		: 'showRanking',
				'/game'			: 'defaultAction',
				'/game/:id'		: 'showGame',

				'*path'			: 'defaultAction' // Default
			},

			initialize:function (options) {
				this.vent = options.vent;
			},

			showTournament: function () {
				this.tournamentView = new TournamentView();
			},

			showSchedule: function () {
				this.schedulePage = new ScheduleView();
				this.schedulePage.render(true);
			},

			showRanking: function() {
				this.rankingPage = new PoolView();
				this.rankingPage.render(true);
			},

			showGame: function(id) {
				this.gamePage = new GameView(id);
				this.gameWinner = new GameWinner(id);
				this.gamePage.render(true);
			},

			defaultAction: function () {
				homeView.render();
			}
		});

		var initialize = function () {
			var app_router = new AppRouter({vent: _.extend({}, Backbone.Events)}); // passing in  an event aggregator... which appears to be some kind of alligator

			Backbone.history.start();
		};

		return {
			initialize: initialize
		};
		
	});
}());
