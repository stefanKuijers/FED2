(function () {
  "use strict";
  define([
    'util/util'
    ,'config'
    ,'models/scheduleGame'
    ,'collections/ScheduleCollection'
    ,'views/schedule/SchedulePoolView'
    ,'text!templates/schedule/page.html'
    ], function (util, config, GameModel, ScheduleCollection, SchedulePoolView, page) {
      return Backbone.View.extend({
        el: $("#page"), // Define element (this.el)

        initialize: function () { // Initialize view *(backbone method)*
            this.resetLocalStorageSets();
          
            this.collection = new ScheduleCollection(); // Specify collection for this view

            this.collection.fetch();

            this.on("change:filterTypeSchedule", this.filterByType, this);
            
            // Attach eventhandlers to collection
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.renderGame, this);
            this.collection.on("remove", this.removeGame, this);
        },

        // Attach event handlers to view elements
        events: {
            "change #filter select": "setFilter",
            "click #add": "addGame",
            "click #showForm": "showForm"
        },

        render: function (initialize) { // Render view *(backbone method)*
            if (initialize === true) $("#page").html(_.template(page)({pageName: "Schedule"})); // the HTML of #page is replaced by the page template
            
            if (config.localStorageEnabled) {
                if (localStorage.getItem('metaDataSet') == null && localStorage.getItem('league') !== null && localStorage.getItem('tournament') !== null ) {
                    $("#metaData").html("<h2>League: " + localStorage.getItem('league') + "</h2><h2>Tournament: " + localStorage.getItem('tournament') + "</h2>");
                    localStorage.setItem('metaDataSet', "set"); 
                }
            }

            this.$el.find("#pools").html("");
            _.each(this.collection.models, function (item) {this.renderPool(item);}, this);
        },

        renderMetaData: function (league, tournament, pool) {
            $("#metaData").html("<h1>League: " + league + "</h1><h1>Tournament: " + tournament + "</h1>");
            $(".scheduleHeader").html("<h2>Schedule: Pool " + pool + "</h2>");
        },

        renderPool: function (item) {
            this.$el.find("#pools").append(new SchedulePoolView({parentCollection: item}).render().el); // Append the rendered HTML to the views element
        },

        // Add game model
        addGame: function (e) {
            e.preventDefault();
            var newModel = {};
            $("#addGame").children("input").each(function (i, el) {
                if ($(el).val() !== "") {
                    newModel[el.id] = $(el).val();
                }
            });

            config.data.schedule.push(newModel);
            this.collection.reset(config.data.schedule);

            if (_.indexOf(util.getTypes(this.collection, "team2"), newModel.team2) === -1) this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
            else this.collection.add(new GameModel(newModel));
                 
        },

        // Remove game model
        removeGame: function (removedModel) {
            var removed = removedModel.attributes;

            _.each(config.data.schedule, function (item) {if (_.isEqual(item, removed)) {config.data.schedule.splice(_.indexOf(config.data.schedule, item), 1);}});
        },

        // Create team2 select box
        createSelect: function () {
            var filter = this.$el.find("#filter"),
                select = $("<select/>", {html: "<option value='all'>all</option>"});

            _.each(util.getTypes(this.collection, "team2"), function (item) {
                $("<option/>", {value: item.toLowerCase(),text: item.toLowerCase()}).appendTo(select);
            });

            return select;
        },

        // Set filter
        setFilter: function (e) {
            e.preventDefault();
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterTypeSchedule");
        },

        // Filter the collection
        filterByType: function () {
            if (this.filterType === "all") this.collection.reset(config.data.schedule);
            else {
                this.collection.reset(config.data.schedule, { silent: true });
                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                    return item.get("team2").toLowerCase() === filterType;
                });
                this.collection.reset(filtered);
            }
        },

        resetLocalStorageSets: function() {
          localStorage.removeItem('currentPoolSet');
          localStorage.removeItem('metaDataSet');  
        },

        // je form showen en laten verwijnen
        showForm: function (e) {
            e.preventDefault();
            this.$el.find("#addGame").slideToggle();
        }

      });
    });
}());