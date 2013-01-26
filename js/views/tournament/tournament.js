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
						console.log("TOURNMENT SUCCES DATA:", data);
						self.render();
					},

					error : function(error) {
						console.log("TOURNMENT ERROR:", error);
					}
				});
			},

			render: function (initialize) {
				console.log(this);
				console.log(this.collection);
				console.log(this.collection.models);

				var compiledTemplate = _.template(tournamentTemplate, this.collection.models[0].toJSON());
				
				$("#page").html(compiledTemplate);
				
			}
		});
		return TournamentView;
	});
}());

// building the view to have a collection... maybe this way it will do the loaderthing...
// maybe its less work to just begin with the other view and collecion in SCHEDULE If it is too mucht work 