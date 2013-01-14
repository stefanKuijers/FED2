/* Filename: js/views/tournament/tournament.js */

(function () {
	"use strict";
	define([
		'models/tournament',
		'text!templates/tournament/tournament.html'
	], function (TournamentModel, tournamentTemplate) {
		var TournamentView = Backbone.View.extend({
			el: $("#page"),
			initialize: function () {
				this.model.bind('change', this.render, this);	
			},
			render: function () {

				var data = this.model.toJSON();

				var compiledTemplate = _.template(tournamentTemplate, data);
				this.el.html(compiledTemplate);
			}
		});
		return TournamentView;
	});
}());