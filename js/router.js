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

			// defining the views of the pages. Ready to Render
			// tournamentPage: 	new TournamentView({model: new TournamentModel({id:config.tournamentID})}),
			// schedulePage: 		new ScheduleView(),
			// rankingPage: 		new PoolView(),
			// gamePage: 			new GameView(),
			// gameWinner:  		new GameWinner(), // this one should be initialized inside of the GameView() as it is a subview.

			routes: {
				'/tournament'	: 'showTournament',
				'/schedule'		: 'showSchedule',
				'/ranking'		: 'showRanking',
				'/game'			: 'showGame',

				'*path'			: 'defaultAction' // Default
			},

			initialize:function (options) {
				this.vent = options.vent;
			},

			showTournament: function () {
				var tournamentModel = new TournamentModel({id:config.tournamentID, vent: this.vent});
				this.tournamentView = new TournamentView({model: tournamentModel, vent: this.vent});
				//this.tournamentView.render(); // results in error
			},

			showSchedule: function () {
				this.schedulePage = new ScheduleView();
				this.schedulePage.render(true);
			},

			showRanking: function() {
				this.rankingPage = new PoolView();
				this.rankingPage.render(true);
			},

			showGame: function() {
				this.gamePage = new GameView();
				this.gameWinner = new GameWinner();
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
