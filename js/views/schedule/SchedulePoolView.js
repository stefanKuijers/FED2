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
    ,'models/empty'
    ], function (util, config, GameModel, SchedulePoolCollection, GameView, scheduleTemplate, gameTemplate, model) {
      return Backbone.View.extend({
        tagName: "section",
        poolName: "undefined",

        initialize: function (options) {
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
            "click .headerButton": "sortOn"
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

        sortOn:function(e) { // this function calls the sort on the collection and reRenders this poolView ater the sorting // user clicked header button
          e.preventDefault();
          this.collection.sortOn(e.currentTarget.name);
          this.render();
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

/*
        addNewSet: function() {
        // New set data
            var set = {
                set_number: this.collection.models.length + 1,
                game_id: "88502", 
                team_1_score: '1',
                team_2_score: '2',
                is_final: false
                
                 
            }

            var json = {
                "game_id": "88457",
                "team_1_score": "1",
                "team_2_score": "1",
                "is_final": "False",
                "set_number": "2"
            }
            
            // Instantiate a new model and stored it in the variable "newModel"
            // Pass the data to the new model as a parameter
            var newModel = new model(set);

            // Set the API url
            newModel.url = "https://api.leaguevine.com/v1/game_scores/";
            
            // Save a new model to the API, this is a "POST" request
            // the save function takes two parameters,
            
            newModel.save(
                // The first parameter is the data object
                json, {
                    // The second parameter takes request options
                    success: function(data) {
                        // On succes set the new url for the model
                        //newModel.url = newModel.get('resource_uri');
                    },
                    error: function(data) {
                        // On error log the error in the console
                        //console.log('error');
                    },
                    // Define an authorization header to allow for posting to the API
                    headers: {
                        Authorization: 'bearer e08a55d872'
                    }
                }
            );
        },
        */