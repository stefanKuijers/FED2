(function () {
  "use strict";
  define([
    'models/Set'
    ], function (Set) {
      return Backbone.Collection.extend({
        model: Set,

        sortKey: "team",

        comparator: function(set) {
	        return parseFloat(set.get('set')); //comerator functie wordt gebruikt om te ordenen op set nummer
	    } 

      });
    });
}());
