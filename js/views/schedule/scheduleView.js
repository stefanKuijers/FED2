(function () {
  "use strict";
  define([
    'util/util'
    ,'config'
    ,'models/game'
    ,'collections/scheduleCollection'
    ,'views/schedule/gamesView'
    ,'text!templates/schedule/schedule.html'
    ,'text!templates/schedule/game.html'
    ], function (util, config, GameModel, ScheduleCollection, GameView, page, gameTemplate) {
      return Backbone.View.extend({
        el: $("#page"), // Define element (this.el)

        initialize: function () { // Initialize view *(backbone method)*
            this.collection = new ScheduleCollection(config.data.schedule); // Specify collection for this view

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
            if (initialize === true) {
                $("#page").html(_.template(page)); // the HTML of #page is replaced by the page template
                this.list = this.$el.find("tbody.games"); // zoek element tbody class games
                this.$el.find("#filter").append(this.createSelect()); //zoek id filter voegt de select toe
            }

            this.$el.find("tbody.games").html("");
            _.each(this.collection.models, function (item) {this.renderGame(item);}, this);
        },

        renderGame: function (item) { // Render game *(custom method)*
            this.$el.find("tbody.games").append(new GameView({model: item}).render(this.collection).el); // Append the rendered HTML to the views element
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

        // je form showen en laten verwijnen
        showForm: function (e) {
            e.preventDefault();
            this.$el.find("#addGame").slideToggle();
        }

      });
    });
}());