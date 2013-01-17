(function () {
  "use strict";
  define([
    'config'
    ,'models/TeamModel'
    ,'collections/PoolCollection'
    ,'views/ranking/TeamView'
    ,'text!templates/ranking/page.html'
    ,'text!templates/ranking/form.html'
    ,'util/util'
    ], function (config, TeamModel, PoolCollection, TeamView, page, form, util) {
      return Backbone.View.extend({
        el: $("#page"), // set the root element that we will refer to often. Note: IF NOT SET ROUTER WILL OVERRULE ALL EVENTS

        currentFilter: {type: "team", value: "all"},
        filters: ["team","won", "lost", "setsWon", "setsLost", "setsBalance","pointsWon", "pointsLost", "pointsBalance"], // these filters will used. Could get this from the model ofcourse...
        
        initialize: function () {
          this.collection = new PoolCollection(config.data.ranking);; // set the collection on which this view is based

          this.collection.on("add", this.renderTeam, this); // if add-event is triggered on collection > call this.renderTeam()
          this.collection.on("remove", this.removeTeam, this); // if remove-event is triggered on collection > call this.removeTeam()
        },


        events: { // multiple events can be triggered by the user
          "click a.headerButton": "sortOn", // if the user clicks <a> with a class of headerButton the function sortOn() is called
          "change section.filterWrapper select": "setFilter", // if section#filterWrapper select is changed > call this.setFiler()
          "click a#addTeamButton": "addTeam", // if a#addTeamButton is clicked > call this.addTeam()
          "click a#createTeamButton": "addCreateRow", // if a#createTeamButton is clicked > call this.addCreateRow()
          "click a#cancelCreateTeamButton": "removeCreateRow" // if a#cancelCreateTeamButton is clicked > call this.removeCreateRow()
        },


        render: function (initialize) {
          var self = this; // fix scoping
          
          if (initialize === true) { // this should only happen the first time!
            $("#page").html(_.template(page)); // the HTML of #page is replaced by the ranking page template
            _.each(this.filters, function (filterName) {$("#" + filterName + "Filter").append(self.createSelectFilter(filterName));});
          } else $("#teamTableBody").html("");  // empty html of tbody to prevent two renders in one view

          _.each(this.collection.models, function (item) {self.renderTeam(item);}, this); // for every model in this collection > call THIS.renderTeam(passing in the model)
          
          this.addCreateTeamButton();  // after creating all the teamModels add the create new team button
        },
        

        renderTeam: function (item) {
          $("#teamTableBody").append(new TeamView({model: item}).render(this.collection).el); // append the root element of the rendered view to the tableBody
        },


        addCreateTeamButton: function () {
          $("#teamTableBody").append("<tr id='createRow'><td><a href='#' id='createTeamButton'>Add Team</a></td></tr>"); // create a button and add it to the tableBody
        },


        removeActionRows: function () { // before adding a new element to the tableBody the actionRows[createRow, confirmRow] are deleted from the view
          $("#createRow").remove();
          $("#confirmRow").remove();
        },

        addCreateRow:function (e) { // Triggered by the user clicking "add team"
          e.preventDefault(); // preventDefault functions that could be triggered by the event.
          $("#createRow").html(_.template(form)); // get the createForm and add it to the createRow in the tableBody
          $("#teamTableBody").append("<tr id='confirmRow'><td><a href='#' id='addTeamButton'>Create Team</a></td></tr>"); // after the form a button to confirm is added
        },


        removeCreateRow:function (e) { // Triggered by the user clicking "cancel"
          if (e) {e.preventDefault();} // preventDefault functions that could be triggered by the event.
          $("#createRow").html("<td><a href='#' id='createTeamButton'>Add Team</a></td>"); // add a button so the user can create another team 
          $("#confirmRow").remove(); // remove the confirm button
        },


        addTeam:function (e) { // Triggered by the user clicking "createTeamButton" after he or she filled in the form.
          e.preventDefault(); // prevent the default f.e. the submission of a form or actions after clicking on a link
          var newModel = {}; // create a new object which will hold the model attributes
          $("#createRow").children("td").each(function (i, el) { // go through all the input elements in the #createRow element
            if (el.getElementsByTagName("input").length > 0) { // if the TD has an input 
              // Here will go some validation in the future
              newModel[el.getElementsByTagName("input")[0].id] = el.getElementsByTagName("input")[0].value; // create an attribute on the modelObject with the name of the id of the input element and store the value of the element in it.
            } 
          });

          config.data.ranking.push(newModel); // push the modelObject in the leagueData array
          
          this.removeActionRows(); // remove the form and the confirmation button as they are no longer needed
          var newTeamModel = new TeamModel(newModel), that = this; // create a teamModel outOf the newModel & do the dirty scopeFix

          _.each(newTeamModel.attributes, // for each of the attributes of the newly created teamModel >
            function (value, key) { // call a function in which the value and the key of the attribute are passed in
              if (_.indexOf(that.getFilterOptions(key), newTeamModel.attributes[key]) === -1) { // if the type/format of this new modelObject is not yet known
                $("#"+key).remove(); // remove the old select
                $("#"+key+"Filter").append(that.createSelectFilter(key, newTeamModel.attributes[key])); // And Create a new selectorList
              }
            }
          );
          this.collection.add(newTeamModel); // add the new teamModel to the collection 
          
          this.addCreateTeamButton(); // then add the createTeamButton in case the user wants to add another team
        },


        removeTeam: function (removedModel) { // this function also removes the model from the dataSet
          var modelAttributes = removedModel.attributes; // first we get the @s
          delete modelAttributes.pointsBalance; // delete the @s which are added on base of other @s
          delete modelAttributes.setsBalance; // injected attributes are deleted
          
          _.each(config.data.ranking, function (item) { // for each item in the dataSet >
            if (_.isEqual(item, modelAttributes)) config.data.ranking.splice(_.indexOf(config.data.ranking, item), 1); // if its equal to the removedModel-@ > remove it from the data
          });
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
