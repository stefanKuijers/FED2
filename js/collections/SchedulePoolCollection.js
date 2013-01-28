 (function () {
  "use strict";
  define([
    'config',
    'models/scheduleGame'
    ], function (config, GameModel) {
      return Backbone.Collection.extend({
        model: GameModel,

        sortKey: "dateObject",
        
        comparator: function(model) { //whenecer this collection sorts it will do so based on this comparator
          var sortKey = this ? this.sortKey : "team1Name";
          if (sortKey === "team1Score") return -model.get(this.sortKey); // else reverse the order for the numbers so the highest comes first
          else return model.get(this.sortKey);
        },

        sortOn: function (key) { // this function sets the sort_key key/attribute of the model, on which this collection is based,
          this.sortKey = key; // set the key passed in to this.sortKey.
          this.sort(); // force this collection to sort itself.
        }

      });
    });
}());