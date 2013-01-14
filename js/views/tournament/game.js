/* filename: js/views/tournament/game.js */

(function () {
	"use strict";
	define([
		'text!templates/tournament/game.html'
	], function (GameTemplate) {
		var GameView = Backbone.View.extend({
			el: $("#page"),
			render: function () {
				this.el.html(GameTemplate);
			}
		});
		return new GameView();
	});
}());