 (function () {
  "use strict";
  define([
    'config',
    'models/tournament'
    ], function (config, TournamentModel) {
      return Backbone.Collection.extend({
        model: TournamentModel,

        url: "https://api.leaguevine.com/v1/tournaments/18519/?{}",

        parse: function(data){
          return data;
        },

      });
    });
}());