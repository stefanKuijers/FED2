/* filename: js/views/tournament/schedule.js */

(function () {
	"use strict";
	define([
		'text!templates/tournament/schedule.html'
	], function (ScheduleTemplate) {
		var ScheduleView = Backbone.View.extend({
			el: $("#page"),
			render: function () {
				this.el.html(ScheduleTemplate);
			}
		});
		return new ScheduleView();
	});
}());