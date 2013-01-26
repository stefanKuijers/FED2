 (function () {
  "use strict";
  define([
    'config',
    'models/scheduleGame'
    ], function (config, GameModel) {
      return Backbone.Collection.extend({
        model: GameModel,

        url: "https://api.leaguevine.com/v1/games/?season_id=20167&tournament_id=18519&pool_id=18742",

        parse: function(data){
          return data.objects;
        },
        
        comparator: function (Schedule) {
          return Schedule.get("team2");
        }

      });
    });
}());