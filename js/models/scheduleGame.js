 (function () {
  "use strict";
  define(["util/util"], function (util) {
      return Backbone.Model.extend({
        defaults: {
            "start_time": "undefined",
            "team1Name": "undefined",
            "team1Score": 0,
            "team2Name": "undefined", 
            "team2Score": 0
        },

        initialize: function(data) {
          var filteredData = {
              gameID          :   data.id,
              poolName        :   (data.pool === null) ? null : data.pool.name,
              seasonName      :   (data.season === null) ? null : data.season.name,
              leagueName      :   (data.season === null) ? null : data.season.league.name,
              tournamentName  :   (data.tournament === null) ? null : data.tournament.name,
              team1Name       :   (data.team_1 === null) ? null : data.team_1.name,
              team1ID         :   data.team_1_id,
              team1URL        :   (data.team_1 === null) ? null : data.team_1.leaguevine_url,
              team1Score      :   data.team_1_score,
              team2Name       :   (data.team_2 === null) ? null : data.team_2.name,
              team2ID         :   data.team_2_id,
              team2URL        :   (data.team_2 === null) ? null : data.team_1.leaguevine_url,
              team2Score      :   data.team_2_score,
              lastUpdate      :   data.time_last_updated,

              dateObject      :   new Date(data.start_time)
          };

          filteredData.date = new util.ParseDate().format(filteredData.dateObject, "%W %d - %N - %y");
          filteredData.time = new util.ParseDate().format(filteredData.dateObject, "%H:%M");

          this.attributes = filteredData;
        }
        
      });
    });
}());