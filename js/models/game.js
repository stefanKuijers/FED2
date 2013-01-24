 (function () {
  "use strict";
  define([], function () {
      return Backbone.Model.extend({
        defaults: {
            "date": "undefined",
            "team1": "undefined",
            "team1Score": 0,
            "team2": "undefined", 
            "team2Score": 0
        }
        
      });
    });
}());