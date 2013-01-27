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
				'/game/:gameID'	: 'showGame',

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

			showGame: function(gameID) {
				this.gamePage = new GameView({id:gameID, vent: this.vent});
				console.log("showGame");
				//this.gameWinner = new GameWinner({id:gameID, vent: this.vent});
				this.gamePage.render(true);
				
			},

			defaultAction: function () {
				homeView.render();
			}
		});



	/*
	
		model.url
		$.ajax
		JSON.parse
			PARSE <----
		CB();


	*/
		var initialize = function () {
			var app_router = new AppRouter({vent: _.extend({}, Backbone.Events)}); // passing in  an event aggregator... which appears to be some kind of alligator

			Backbone.history.start();
		};

		return {
			initialize: initialize
		};
		
	});
}());
