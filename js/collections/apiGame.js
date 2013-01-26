(function () {
  "use strict";
  define([
    'config',
    'models/empty'
    ], function (config, emptyModel) {
      return Backbone.Collection.extend({
        
        model: emptyModel,
        url: config.api_url,

        parse: function(data){

          console.log(data);

          return data;
        }

      });
    });
}());