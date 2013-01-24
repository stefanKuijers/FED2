 (function () {
  "use strict";
  define([
    'models/game'
    ], function (GameModel) {
      return Backbone.Collection.extend({
        model: GameModel,

        //sorteert op team2 
        comparator: function (Schedule) {
          return Schedule.get("team2");
        }

      });
    });
}());