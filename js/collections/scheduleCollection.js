 (function () {
  "use strict";
  define([
    'config'
    ,'models/SchedulePoolModel'
    ], function (config, SchedulePoolModel) {
      return Backbone.Collection.extend({
        model: SchedulePoolModel,

        url: config.api_url + "games/?season_id=20167&limit=100&tournament_id=18519",

        parse: function(data){
          var poolsObject = {};
          _.each(data.objects, function(object) {poolsObject[object.pool.name] ? poolsObject[object.pool.name].push(object) : poolsObject[object.pool.name] = [object];});
          //console.log("PARSED POOLS:", poolsObject);
          
          if (config.localStorageEnabled) {
              if (localStorage.getItem('league') === null ) localStorage.setItem('league', data.objects[0].tournament.season.league.name);
              if (localStorage.getItem('tournament') === null )localStorage.setItem('tournament', data.objects[0].tournament.name);
          }
          var pools = []; 
          for(var key in poolsObject) pools.push(poolsObject[key]);
          
          pools.sort(function(a,b){ // sorting the pools to be A, B, C, D
            if (a[0].pool.name < b[0].pool.name) return -1 
            if (a[0].pool.name > b[0].pool.name) return 1
            return 0
          });

          return pools;
        },
        
        comparator: function (Schedule) {
          return Schedule.get("team2");
        }

      });
    });
}());