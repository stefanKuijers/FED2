(function () {
  "use strict";
  define([
    'models/TeamModel'
    ], function (TeamModel) {
      return Backbone.Collection.extend({
        model: TeamModel,

        sortKey: "team",

        comparator: function(model) { //whenecer this collection sorts it will do so based on this comparator
          
          var sortKey = this ? this.sortKey : "team";
         if (sortKey === "team") return model.get(this.sortKey); // if the sortKey == team > return in normal order
          else return -model.get(this.sortKey); // else reverse the order for the numbers so the highest comes first

        },

        sortOn: function (key) { // this function sets the sort_key key/attribute of the model, on which this collection is based,
          this.sortKey = key; // set the key passed in to this.sortKey.
          this.sort(); // force this collection to sort itself.
        }

      });
    });
}());
