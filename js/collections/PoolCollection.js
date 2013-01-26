(function () {
  "use strict";
  define([
    'models/TeamModel'
    ], function (TeamModel) {
      return Backbone.Collection.extend({
        model: TeamModel,

        url: "https://api.leaguevine.com/v1/games/?season_id=20167&tournament_id=18519&pool_id=18742", //A = 18739 //D = 18742

        sortKey: "team",

        teams: {},

        comparator: function(model) { //whenecer this collection sorts it will do so based on this comparator
          
          var sortKey = this ? this.sortKey : "team";
         if (sortKey === "team") return model.get(this.sortKey); // if the sortKey == team > return in normal order
          else return -model.get(this.sortKey); // else reverse the order for the numbers so the highest comes first

        },

        sortOn: function (key) { // this function sets the sort_key key/attribute of the model, on which this collection is based,
          this.sortKey = key; // set the key passed in to this.sortKey.
          this.sort(); // force this collection to sort itself.
        },

        parse: function (data) {
          var self = this;
          _.each(data.objects, function (object) {
              if (!self.teams[object.team_1.id])  {
                self.teams[object.team_1.id] = object.team_1;
              } else if (!self.teams[object.team_2.id]) {
                self.teams[object.team_2.id] = object.team_2;
              }
          });

          var newData = []; for(var k in this.teams) {newData.push(this.teams[k]);}
          console.log("COLLECTION PARSE");

          return newData;
        }

      });
    });
}());
