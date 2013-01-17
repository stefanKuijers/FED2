/* Filename: js/views/tournament/tournament.js */

(function () {
	"use strict";
	define([
		'models/tournament',
		'text!templates/tournament/tournament.html'
	], function (TournamentModel, tournamentTemplate) {
		var TournamentView = Backbone.View.extend({
			model: TournamentModel,

			el: $("#page"),

			initialize: function (options) {
				$("#page").html("loading...");
				
				this.vent = options.vent;
				console.log(this.model);

				this.vent.bind('dataLoaded', this.render);
			},

			render: function (model) {
				console.log("data loaded. Rendering model:", model);
				this.model = model;
				
				var data = {
					tournament: this.model,
					_: _
				};

				var compiledTemplate = _.template(tournamentTemplate, data);
				
				$("#page").html(compiledTemplate);
			}
		});
		return TournamentView;
	});
}());