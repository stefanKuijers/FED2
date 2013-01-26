/* Filename: js/views/tournament/tournament.js */

(function () {
	"use strict";
	define([
		'models/tournament',
		'collections/tournamentCollection',
		'text!templates/tournament/tournament.html'
	], function (TournamentModel, TournamentCollection, tournamentTemplate) {
		var TournamentView = Backbone.View.extend({
			el: $("#page"),

			initialize: function (options) {
				this.collection = new TournamentCollection();

				var self = this;
				this.collection.fetch({
					success: function(data) {
						self.render();
					},

					error : function(error) {
						console.log("TOURNMENT ERROR:", error);
					}
				});
			},

			render: function (initialize) {
				$("#page").html(_.template(tournamentTemplate, this.collection.models[0].toJSON()));
			}
		});
		return TournamentView;
	});
}());