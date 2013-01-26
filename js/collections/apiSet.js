(function () {
  "use strict";
  define([
    'config',
    'models/empty'
    ], function (config, emptyModel) {
      return Backbone.Collection.extend({
<<<<<<< HEAD

         initialize: function (options) {
          this.gameID = options.id;
          console.log('gameID @ apiSet: ' + this.gameID);
          this.url = this.url + this.gameID;
        },
        model: emptyModel,
        url: config.api_url + 'game_scores/?tournament_id=18519&game_id=', 
=======
        
        model: emptyModel,
        url: config.api_url + 'game_scores/?tournament_id=18519&game_id=88452', //game_id sould be a variable passed from the game after clicking 
>>>>>>> master

        parse: function(data){
          console.log(this.url);
          console.log(data);

          return data.objects;
        }

      });
    });
}());