(function () {
  "use strict";
  define([
    'config',
    'models/empty'
    ], function (config, emptyModel) {
      return Backbone.Collection.extend({

         initialize: function (options) {
          this.gameID = options.id;
          console.log('gameID @ apiSet: ' + this.gameID);
          this.url = this.url + this.gameID;
        },
        model: emptyModel,
        url: config.api_url + 'game_scores/?tournament_id=18519&game_id=', 
        


        parse: function(data){
          console.log(this.url);
          console.log(data);

          return data.objects;
        }

      });
    });
}());