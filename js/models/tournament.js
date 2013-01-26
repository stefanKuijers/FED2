 (function () {
  "use strict";
  define([], function () {
      return Backbone.Model.extend({
        defaults: {
            "leagueName": "undefined",
            "seasonName": "undefined",
            "tournamentName": "undefined", 
            "startDate": "nS",
            "endDate": "nE" 
        },

        parse: function(data) {
			return {
			  id : data.id,
			  startDate : data.start_date,
			  endDate : data.end_date,
			  info : data.info,
			  name : data.name,
			  schedulingFormat: data.scheduling_format,

			  seasonName : data.season.name,
			  seasonURI: data.season.resource_uri,
			  seasonID: data.season_id,

			  leagueID : data.season.league.id,
			  leagueName : data.season.league.name,
			  leagueURI: data.season.league.resource_uri
			};
        }
      });
    });
}());
