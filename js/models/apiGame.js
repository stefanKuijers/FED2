(function () {
  "use strict";
  define([
    'config',
    ], function (config){
      return Backbone.Model.extend({
        defaults: {
              gameID          :   '00000',
              poolName        :   'unknow pool',
              seasonName      :   'unknow season',
              leagueName      :   'unknow league',
              tournamentName  :   'unknow tournament',
              setCount        :   '5',
              team1Name       :   'Team 1 (no name)',
              team1ID         :   '00000',
              team1URL        :   'http://www.leaguevine.com/',
              team1Score      :   '0',
              team2Name       :   'Team 2 (no name)',
              team2ID         :   '00000',
              team2URL        :   'http://www.leaguevine.com/',
              team2Score      :   '0',
              gameWinner      :   'no winner',
              gameWinnerID    :   '00000',
              lastUpdate      :   '1970-01-01T00:00:00.00000+00:00'
        },
              //88516 88452  88491
        url: config.api_url + 'games/88452/', //game_id sould be a variable passed from the game after clicking 

        parse: function(data){
          console.log(this.url);
         // console.log(data);

          var cleanData = {
              gameID          :   data.id,
              poolName        :   (data.pool === null) ? null : data.pool.name,
              seasonName      :   (data.season === null) ? null : data.season.name,
              leagueName      :   (data.season === null) ? null : data.season.league.name,
              tournamentName  :   (data.tournament === null) ? null : data.tournament.name,
              setCount        :   data.number_of_sets,
              team1Name       :   (data.team_1 === null) ? null : data.team_1.name,
              team1ID         :   data.team_1_id,
              team1URL        :   (data.team_1 === null) ? null : data.team_1.leaguevine_url,
              team1Score      :   data.team_1_score,
              team2Name       :   (data.team_2 === null) ? null : data.team_2.name,
              team2ID         :   data.team_2_id,
              team2URL        :   (data.team_2 === null) ? null : data.team_1.leaguevine_url,
              team2Score      :   data.team_2_score,
              gameWinner      :   (data.winner === null) ? null : data.winner.name,
              gameWinnerID    :   (data.winner === null) ? null : data.winner.id,
              lastUpdate      :   data.time_last_updated
          };

          return cleanData;
        }
      });
    });
}());