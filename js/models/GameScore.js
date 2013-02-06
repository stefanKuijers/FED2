(function () {
  "use strict";
  define([
    'util/util'
    ], function (util) {
      return Backbone.Model.extend({


        validate: function(attrs) {
            var invalid=[];
            if (attrs.game_id==="") invalid.push("game_id");
            if (attrs.set_number==="") invalid.push("set_number");
            if (attrs.is_final==="") invalid.push("is_final");
            if (attrs.team_1_score==="") invalid.push("team_1_score");
            if (attrs.team_2_score==="") invalid.push("team_2_score");

            if (invalid.length>0) return invalid;
        },
        comparator: function(set) {
          return parseFloat(set.get('set_number')); //comerator functie wordt gebruikt om te ordenen op set nummer
        } 

      });
    });
}());