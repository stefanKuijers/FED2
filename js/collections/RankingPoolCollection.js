(function () {
  "use strict";
  define([
    'config'
    ,'models/TeamModel'
    ], function (config, TeamModel) {
      return Backbone.Collection.extend({
        model: TeamModel,

        sortKey: "teamName",

        initialize: function (poolID) {
          this.url = "https://api.leaguevine.com/v1/pools/?pool_ids=%5B" + poolID + "%5D"; //this.url = config.api_url + "games/?season_id=20167&tournament_id=18519&pool_id=" + poolID;
        },

        comparator: function(model) { //whenecer this collection sorts it will do so based on this comparator
          if (!model.data) model.data = model.attributes;
          if (this.sortKey === "teamName") return model.data[this.sortKey]; // if the sortKey == team > return in normal order
          else return -model.data[this.sortKey]; // else reverse the order for the numbers so the highest comes first
        },

        sortOn: function (key) { // this function sets the sort_key key/attribute of the model, on which this collection is based,
          this.sortKey = key; // set the key passed in to this.sortKey.
          this.sort(); // force this collection to sort itself.
        },

        parse: function (data) {
          return data.objects[0].standings;
        }

      });
    });
}());
