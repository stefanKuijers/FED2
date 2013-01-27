(function () {
  "use strict";
  define([
    'util/util'
    ], function (util) {
      return Backbone.Model.extend({
        defaults: {
    			set: 0,
          isFinal: false,
    			team1: 'unknown',		
    			team1Score: 0,
    			team2: 'unknown',
    			team2Score: 0,
    			setWinner: 'unknown'
    		}
      });
    });
}());