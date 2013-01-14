define([
  'models/team'
], function(teamModel){
  var rankingCollection = Backbone.Collection.extend({
    model: teamModel,
    initialize: function(){

    }

  });

  return new rankingCollection;
});
