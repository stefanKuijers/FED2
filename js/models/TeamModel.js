/* filename: js/models/TeamModel.js */
(function () {
  "use strict";
  define([
    'util/util'
    ], function (util) {
      return Backbone.Model.extend({
        

        defaults: {
          team: 'team name',
          won: 0,
          lost: 0,
          //setsWon: 0,
          //setsLost: 0,
          pointsWon: 0,
          pointsLost: 0,
          //setsBalance: 0,
          pointsBalance: 0
        },

        initialize : function () {
          //this.attributes.setsBalance = util.calcDifference(this.attributes.setsWon, this.attributes.setsLost);
          //this.attributes.pointsBalance = util.calcDifference(this.attributes.pointsWon, this.attributes.pointsLost);
        },

        // https://api.leaguevine.com/v1/game_scores/?tournament_id=18519&game_id=88516
        parse : function (data) {
          var self = this;

          if (!this.statsCall) { // if the subcall was not yet made...
            // write out the data recieved with the first call
            //console.log("Primary data: ", data);
            this.data = this.data || {};
            this.data.team = data.name;
            this.data.id = data.id;

            // the data we need is not yet complete make a second call to get team stats per tournament
            this.url = "https://api.leaguevine.com/v1/stats/ultimate/team_stats_per_tournament/"+data.id+"/18519/?{}",
            this.fetch({
              success:  function (subData) {
                self.subParse = true;
              }
            });

            this.statsCall = true;
          } else { // this is the parse of the subcall
            // write data to attributes
            this.data.won = data.wins;
            this.data.lost = data.losses;
            this.data.pointsWon = data.points_scored;
            this.data.pointsLost = data.points_allowed;
            this.data.pointsBalance = util.calcDifference(data.points_scored, data.points_allowed);
            this.call2 = data;
            //console.log("MODEL TEAM STATS DATA:", data);
          }

          
          
        }
      });
    });
}());