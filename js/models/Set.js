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
    		},

    		initialize : function () { //bereken de setWinner op basis van de score van de 2 teams. gelijkspel returns Tie
        		this.attributes.setWinner = util.setWinner(this.attributes.team1Score, this.attributes.team2Score, this.attributes.team1, this.attributes.team2);
      	}
        
      });
    });
}());