(function () {
  "use strict";
  define([
    'util/util'
    ,'config'
    ,'models/scheduleGame'
    ,'collections/SchedulePoolCollection'
    ,'views/schedule/gamesView'
    ,'text!templates/schedule/schedule.html'
    ,'text!templates/schedule/game.html'
    ], function (util, config, GameModel, SchedulePoolCollection, GameView, scheduleTemplate, gameTemplate) {
      return Backbone.View.extend({
        tagName: "section",
        poolName: "undefined",

        initialize: function (options) { // Initialize view *(backbone method)*
            this.resetLocalStorageSets();
            
            this.poolName = options.parentCollection.pool;
            this.poolID = options.parentCollection.attributes[0].pool_id;
            var collectionData = [];
            for (var game in options.parentCollection.attributes) 
                if (options.parentCollection.attributes[game] !== "undefined") 
                    collectionData.push(options.parentCollection.attributes[game]);

            this.collection = new SchedulePoolCollection(collectionData); // Specify collection for this view
        },

        events: {
            "click .minimize": "slideToggleTable",
            "click .showRanking": "navigateToRanking",
        },


        render: function (initialize) { // Render view *(backbone method)*
            this.$el.html(_.template(scheduleTemplate)({poolID: this.poolID, poolName: this.poolName, date: this.collection.models[0].attributes.date}));
            this.list = this.$el.find("tbody.games");   
            this.$el.find("tbody.games").html("");

            _.each(this.collection.models, function (item) {this.renderGame(item);}, this);

            $(this.el).attr("class", "schedule");
            $(this.el).attr("id", this.poolName);

            return this;
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

        resetLocalStorageSets: function() {
          localStorage.removeItem('currentPoolSet');
          localStorage.removeItem('metaDataSet');  
        },

        slideToggleTable : function (e) {
            e.preventDefault();
            this.$el.find(".scheduleContent").slideToggle();
        },

        navigateToRanking:function (e){
            window.location = $(e.currentTarget).attr("href");
        } 

      });
    });
}());