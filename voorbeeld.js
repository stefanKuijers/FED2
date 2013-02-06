var config = {
    tournamentID: 18488,
    access_token: '109f8a19ae',
    api_url: 'https://api.leaguevine.com/v1/tournaments/',
    season_id: '20157'
}

// We can use an empty model here. We won't be manipulating any data
var Model = Backbone.Model.extend({});

// Note: this view does NOT render anything actually
var View = Backbone.View.extend({
    initialize: function() {
        var self = this;
        this.collection = new Collection();
        // when you fetch:
        // Backbone fetch => Collection parse => success callback
        this.collection.fetch({
            success: function(data) {
                //console.log(self.collection.toJSON());
                _.each(self.collection.models, function(model){
                    // set a resource uri on the model
                    //console.log("model data: ", model.toJSON());
                    //console.log("model: ", model);
                    model.url = model.get('resource_uri');
                    //console.log(model.url);
                });
                self.addTournament();
            }
        });
    },
    addTournament: function() {
        var tournament = {
            name: 'Demo tournament with API for group 2!',
            start_date: '2013-05-10',
            end_date: '2013-05-15',
            season_id: config.season_id
        }
        
        // create a new model by passing properties into the Model() constructor
        var newModel = new Model(tournament);
        // if we want to POST a new tournament model, we need the api_url
        // see: https://www.leaguevine.com/docs/api/
        newModel.url = config.api_url;
        
        // save(data, options)
        console.log('new model to json: ', newModel.toJSON());
        newModel.save(newModel.toJSON(), {
            success: function(data) {
                // when this model is saved, we want to be able to update it
                // when a model is saved, it gets properties that are returned by the API!
                // we can log the data that is in the model => console.log(newModel.toJSON);
               
                //console.log('model after saving: ', newModel.toJSON()); 
                
                //var league_id = newModel.get('season').league_id;
                //console.log('league id', league_id);
                newModel.url = newModel.get('resource_uri');
            },
            error: function(data) {
                console.log('error');
            },
            headers: {
                // we need to authorize for this.
                // see the API demo for more info
                Authorization: 'bearer '+config.access_token
            }
        });
    }
});

var Collection = Backbone.Collection.extend({
    model: Model,
    url: config.api_url,
    parse: function(data) {
        // what do we get from the API?    
        // we could log data, right? Let's!
        console.log("data to parse: ", data);
        
        return data.objects;
    }
});

// start the App plz
var myView = new View();


/*<form id="addGameSet" action="#">
            <h1>Add a set</h1>
            <input id="set" placeholder="0" type="text" maxlength="1" style="text-align:center;">
            <input id="team1" placeholder="Team naam 1" type="text">
            <input id="team1Score" placeholder="0" maxlength="2" type="text" style="text-align:right;"> - <input id="team2Score" placeholder="0"  maxlength="2" type="text">
            <input id="team2" placeholder="Team naam 2" type="text">
            <button type="submit" id="addSet">Add</button>
        </form>*/


        addScore: function(){
            event.preventDefault();
            var self = this;
            var scoreData = {
                'game_id'
                : this.$el.find('input[name=game_id]').val(),
                'team_1_score'
                : this.$el.find('input[name=team_1_score]').val(),
                'team_2_score'
                : this.$el.find('input[name=team_2_score]').val(),
                'is_final'
                : 'false',
                'set_number'
                : this.$el.find('input[name=set_number]').val()
            };
            var addScore = new LEAGUEVINE.Score(scoreData);
            addScore.url = 'https://api.leaguevine.com/v1/game_scores/';
            addScore.save(
                addScore.toJSON(), {
                    success: function(data) {
                        console.log('Score met succes toegevoegd...');
                        self.initialize();
                    },
                    error: function(data) {
                        console.error('Fout tijdens updaten API');
                    },
                    headers: {
                        Authorization: 'bearer c2bce1fd3a'
                    }
                }
                );
        },
        showScorelist: function(event){
            event.preventDefault();
            var button = $(event.target);
            var content = button.prev();
            if(content.is(':hidden') == true){
                content.slideDown('slow');
                button.addClass('active')
            }
            else {
                content.slideUp('slow');
                button.removeClass('active');
            }
        },
        setGameID: function(event){
            var gameID = $(event.target).find(".game_id").text();
            this.$el.find('input[name=game_id]').val(gameID);
        }
    });