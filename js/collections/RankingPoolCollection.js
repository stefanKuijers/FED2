(function () {
  "use strict";
  define([
    'config'
    ,'models/TeamModel'
    ], function (config, TeamModel) {
      return Backbone.Collection.extend({
        model: TeamModel,

        sortKey: "team",

        initialize: function (poolID) {
          this.url = config.api_url + "games/?season_id=20167&tournament_id=18519&pool_id=" + poolID;
        },

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

          var teams = {};
          _.each(data.objects, function (object) { // save all the teams in the this.teams
              if (!teams[object.team_1.id])  { 
                teams[object.team_1.id] = object.team_1;
              } else if (!teams[object.team_2.id]) {
                teams[object.team_2.id] = object.team_2;
              }
          });

          var newData = []; for(var k in teams) {newData.push(teams[k]);} // make a nice array of this stuff

          // set meta in localStorage if not yet the case
          if (config.localStorageEnabled) {
              if (localStorage.getItem('league') === null ) localStorage.setItem('league', data.objects[0].tournament.season.league.name);
              if (localStorage.getItem('tournament') === null )localStorage.setItem('tournament', data.objects[0].tournament.name);
              if (localStorage.getItem('currentPool') === null )localStorage.setItem('currentPool', data.objects[0].pool.name);
          }

          return newData;
        }

      });
    });
}());
