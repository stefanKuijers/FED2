(function () {
  "use strict";
  define([
    'config'
    ,'models/TeamModel'
    ,'collections/RankingPoolCollection'
    ,'views/ranking/TeamView'
    ,'text!templates/ranking/page.html'
    ,'text!templates/ranking/form.html'
    ,'util/util'
    ], function (config, TeamModel, PoolCollection, TeamView, page, form, util) {
      return Backbone.View.extend({
        el: $("#page"), // set the root element that we will refer to often. Note: IF NOT SET ROUTER WILL OVERRULE ALL EVENTS

        currentFilter: {type: "team", value: "all"},
        filters: ["team","won", "lost", "setsWon", "setsLost", "setsBalance","pointsWon", "pointsLost", "pointsBalance"], // these filters will used. Could get this from the model ofcourse...
        
        initialize: function (poolName, poolID) {
          this.poolName = poolName;
          this.poolID = poolID;

          this.resetLocalStorageSets();

          this.collection = new PoolCollection(this.poolID);

          var self = this;
          this.collection.fetch({
            success: function(data) {
              console.log("hij is gefetched", data);
              self.render();
            },

            error: function(error) {
              console.log(error);
            }

          });


          this.collection.on("add", this.renderTeam, this); // if add-event is triggered on collection > call this.renderTeam()
          this.collection.on("remove", this.removeTeam, this); // if remove-event is triggered on collection > call this.removeTeam()
        },


        events: { // multiple events can be triggered by the user
          "click a.headerButton": "sortOn", // if the user clicks <a> with a class of headerButton the function sortOn() is called
        },


        render: function (initialize) {
          var self = this; // fix scoping
          
          if (initialize === true) { // this should only happen the first time!
            $("#page").html(_.template(page)({poolName: this.poolName, pageName: "Ranking"})); // the HTML of #page is replaced by the ranking page template
          }

          if (config.localStorageEnabled) {
            if (localStorage.getItem('metaDataSet') == null && localStorage.getItem('league') !== null && localStorage.getItem('tournament') !== null ) {
                $("#metaData").html("<h2>League: " + localStorage.getItem('league') + "</h2><h2>Tournament: " + localStorage.getItem('tournament') + "</h2>");
                localStorage.setItem('metaDataSet', "set"); 
            }
          }

          //console.log("This.collection.models", this.collection.models);

          $("#teamTableBody").html("");  // empty html of tbody to prevent two renders in one view
          _.each(this.collection.models, function (item) {self.renderTeam(item);}, this); // for every model in this collection > call THIS.renderTeam(passing in the model)
        },
        
        renderTeam: function (item) {
          //console.log("Team rendered", item);
          var tv = new TeamView({model: item});
          var render = tv.render().el;
          //console.log("TV", tv);
          //console.log("render.el", render);
          $("#teamTableBody").append(render); // append the root element of the rendered view to the tableBody
        },

        sortOn:function(e) { // this function calls the sort on the collection and reRenders this poolView ater the sorting // user clicked header button
          e.preventDefault();
          this.collection.sortOn(e.currentTarget.name);
          this.render();
        },


        createSelectFilter: function (key, newValue) { // create a select with all the options the values that are on this model on base of the type
          var select = $("<select/>", { id: key, html: "<option value='all'>all</option>"}); // create the select

          _.each(this.getFilterOptions(key), function (item) {$("<option/>", {value: item,text: item}).appendTo(select);}); // for each filterOptions for this type > create an option and pass in the value under this key/type. removed store in var
          if (newValue) $("<option/>", {value: newValue,text: newValue}).appendTo(select); // if (newType) add it as well

          return select;
        },


        getFilterOptions: function (key) {
          this.collection.reset(config.data.ranking);
          return util.getTypes(this.collection, key);
        },

        resetLocalStorageSets: function() {
          localStorage.removeItem('currentPoolSet');
          localStorage.removeItem('metaDataSet');  
        },


        setFilter: function (e) { // Triggered by the user changing the filter. 
          this.currentFilter = { // create an object that holds the type/key and the value
            type: e.currentTarget.id,
            value: e.currentTarget.value
          }; 

          this.collection.reset(config.data.ranking); // what is the silent for? collection.reset function API > reset is to supress any events that might be triggered. Dont need it.
          if (this.currentFilter.value !== "all") { // if filter is not all 
            var filterValue = this.currentFilter.value, // set var from parent scope
              filterType = this.currentFilter.type,
              filtered = _.filter(this.collection.models, function (item) { // set var which holds filtered data & trigger filter in function
                return item.get(filterType) == filterValue; // function returns all items of which the key matches the filterType set by the user
              });
            this.collection.reset(filtered); // inject filtered data in collection
          }

          this.render();
          _.each(this.filters, function (filter) { if(filterType !== filter){$("#" + filter).prop('selectedIndex',0)}}, this); // set all the filters except current to default as we only support single level filtering 
        },

      });
    });
}());
