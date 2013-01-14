/* filename: js/views/tournament/ranking.js */

(function () {
	"use strict";
	define([
		'text!templates/tournament/ranking.html'
	], function (RankingTemplate) {
		var RankingView = Backbone.View.extend({
			el: $("#page"),
			render: function () {
				this.el.html(RankingTemplate);
			}
		});
		return new RankingView();
	});
}());