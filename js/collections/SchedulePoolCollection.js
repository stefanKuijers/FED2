 (function () {
  "use strict";
  define([
    'config',
    'models/scheduleGame'
    ], function (config, GameModel) {
      return Backbone.Collection.extend({
        model: GameModel,

        //url: config.api_url + "games/?season_id=20167&tournament_id=18519&pool_id=18742",
        initialize: function (data) {
          //console.log("INIT SCHEDULEPOOLCOLLECTION DATA:", data);
        },
        
        comparator: function (Schedule) {
          return Schedule.get("team2");
        }

      });
    });
}());