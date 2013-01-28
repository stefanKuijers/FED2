(function () {
  "use strict";
  define([
    'config',
    'models/GameScore'
    ], function (config, gameScoreModel) {
      return Backbone.Collection.extend({
        
        model: gameScoreModel,
        url: config.api_url,

      });
    });
}());