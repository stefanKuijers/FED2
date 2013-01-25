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
          setsWon: 0,
          setsLost: 0,
          pointsWon: 0,
          pointsLost: 0,
          setsBalance: 0,
          pointsBalance: 0
        },

        initialize : function () {
          this.attributes.setsBalance = util.calcDifference(this.attributes.setsWon, this.attributes.setsLost);
          this.attributes.pointsBalance = util.calcDifference(this.attributes.pointsWon, this.attributes.pointsLost);
        }
      });
    });
}());