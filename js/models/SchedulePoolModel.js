 (function () {
  "use strict";
  define([], function () {
      return Backbone.Model.extend({
        defaults: {
            "pool": "undefined"
        },

        parse: function(data) {
          this.pool = data[0].pool.name;
          return data;
        }
      });
    });
}());