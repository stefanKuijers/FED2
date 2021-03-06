/* filename: js/views/home/home.js */

(function () {
	"use strict";
	define([
		'text!templates/home/home.html'
	], function (HomeTemplate) {
		var HomeView = Backbone.View.extend({
			el: $("#page"),
			render: function () {
				$("#page").html(HomeTemplate);
				//this.el.html(HomeTemplate);
			}
		});
		return new HomeView();
	});
}());