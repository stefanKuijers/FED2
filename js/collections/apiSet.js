(function () {
  "use strict";
  define([
    'config',
    'models/empty'
    ], function (config, emptyModel) {
      return Backbone.Collection.extend({
        
        model: emptyModel,
        url: config.api_url + 'game_scores/?tournament_id=18519&game_id=88452', //game_id sould be a variable passed from the game after clicking 

        parse: function(data){
          console.log(this.url);
          console.log(data);

          return data.objects;
        }

      });
    });
}());