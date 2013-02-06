(function () {
  "use strict";
  define([
    'config'
    ,'models/Set'
    ,'models/GameScore'
    ,'collections/Game'
    ,'collections/apiSet'
    ,'views/game/GameSet'
    ,'views/game/GameWinner'
    ,'text!templates/game/game.html'
    ,'text!templates/game/addSetsContainer.html'
    ,'text!templates/game/addSetSection.html'
    ,'util/util'
    ], function (config, SetModel, GameScoreModel, GameCollection, apiSetCollection, SetView, GameWinnerView, page, addSetsContainer, addSetSection, util) {
      return Backbone.View.extend({
	
		el: $("#page"),

		initialize: function (options) {
 			this.vent = options.vent;
 			this.gameID = options.id;

 			_.bindAll(this); //Make all methods in this class have `this` bound to this class (http://stackoverflow.com/a/12655409)
 			var self = this;

			this.gameWinner = new GameWinnerView({id:this.gameID, vent: this.vent}); //get gameInformation
			
			this.vent.bind('gameDataLoaded', this.fetchSetCollection); //bind gameDataLoaded event 

		    //this.on("change:filterTypeGame", this.filterByOptions, this);
	  	},

	  	//assign events
	  	events: {
	  		"click input#submitScore": "submitGameScore",
	  		"click input#addScore": "showScoreSubmitForm",
	  		//"change #gameFilter select": "setFilter"
	  	},

	  	//render de view
	  	render: function (initialize) {
	  		if (initialize === true) {
	  			$("#page").html(_.template(page));
	  			this.gameTable =  this.$el.find("#gameResult");
	  			this.gameContainer =  this.$el.find("#gameContainer");
		    	//this.addSetForum =  this.$el.find("#addGameSet");
	  		}   
		},

		renderSets: function () {
			var self = this;
		    //$("#gameFilter").append(this.createFilterOptions());
			$("#gameResult").find("tr:gt(0)").remove(); // remove old data from table (http://stackoverflow.com/a/370031/1136000)
		   _.each(this.collection.models, function (item) {self.renderSetItem(item);}, this);
		   $("#gameContainer").append('<input type="submit" id="addScore" value="Add a new Score set">');
		},


		fetchSetCollection: function(data){
			this.vent.unbind('gameDataLoaded'); //unbind the call gameDataLoaded! leuke ervaring met het niet unbinden.
			var self = this;
 			this.currentGameData = this.currentGameData || data;

			console.log("fetchSetCollection triggered");

			this.setCollection = new apiSetCollection({id:this.currentGameData.gameID, vent: this.vent});
			
		    this.setCollection.fetch({
		    	success : function(fetchedData){
		    		console.log("setCollection fetch succes");
		    		
		    		var mostResentGameData = fetchedData.at(0);

		    		if(mostResentGameData !== undefined ){
		    			var gameData = mostResentGameData.attributes;
		    			gameData.team_1  	= self.currentGameData.team1Name;
		    			gameData.team_1_id	= self.currentGameData.team1ID;
		    			gameData.team_2		= self.currentGameData.team2Name;
		    			gameData.team_2_id	= self.currentGameData.team2ID;	
		    			self.repackData(gameData, true);
		    		}else{
		    			console.log("no scores yet.."); 
		    			self.showScoreSubmitForm();
		    		}
		    	},
		    	error : function(){
				    console.log("Error: game sets could not be retrieved");
				    $("#gameContainer").empty();
				    $("#gameContainer").append('<h1>Oops! Something went wrong while trying to get the Set data for this game.</h1>');
		    	}
		    });


		   	// this.setCollection.on("reset", this.render, self);
		   	this.setCollection.on("addSet", this.renderSets, self);
		  	this.setCollection.on("remove", this.removeSet, self);
		},

		repackData: function (data, fromServer){
			var self = this;
			console.log(self.currentGameData);
			var array = [];
			this.collection = this.collection || new GameCollection();
			if(fromServer){
				this.collection.reset();
				_.each(data.game_sets, function(set){
				var tempObject = {
					set: set.number.toString(), 
					isFinal: set.is_final.toString(),
					team1: self.currentGameData.team1Name,
					team1Score: set.team_1_score.toString(),
					team2:  self.currentGameData.team2Name,
    				team2Score: set.team_2_score.toString(), 
    				setWinner:  (set.team_1_score > set.team_2_score || set.team_1_score < set.team_2_score) ? ((set.team_1_score > set.team_2_score ) ?  self.currentGameData.team1Name :  self.currentGameData.team2Name) : "tie", 
				}				//^ een dubbele inline if else statmenet: 1e if else of het gelijk spel is of niet, 2e welke de set heeft gewonnen
				array.push(tempObject);
			});
			}else{
				var singleObject = {
					set: data.set_number.toString(), 
					isFinal: data.is_final.toString(),
					team1:  self.currentGameData.team1Name,
					team1Score: data.team_1_score.toString(),
					team2:  self.currentGameData.team2Name,
    				team2Score: data.team_2_score.toString(), 
    				setWinner:  (data.team_1_score > data.team_2_score || data.team_1_score < data.team_2_score) ? ((data.team_1_score > data.team_2_score ) ?  self.currentGameData.team1Name :  self.currentGameData.team2Name) : "tie", 
				}
				array.push(singleObject);	
			}
			this.collection.add(array);
			this.renderSets();
		},	

		//render de verschillende sets 
		renderSetItem: function (item){
			$("#gameResult").append(new SetView({model: item}).render(this.collection).el);
		},

		showScoreSubmitForm: function(){
			$("#addScore").remove();
			var self = this;
			console.log('showScoreSubmitForm');
			//$("#gameContainer").empty();
		    	$("#gameContainer").append(_.template(addSetsContainer)({gameID:self.currentGameData.gameID}));

		    		var templateData = { 
		    			maxSetNr: self.currentGameData.setCount,
		    			setSection : 'setSection',
		    			setNrID : 'set',
		    			setNr: 1,
		    			team1NameID: "team_1_name",  
		    			team1Name : self.currentGameData.team1Name,
		    			team1ScoreID : "team_1_score",
		    			team2NameID: "team_2_name",  
		    			team2Name : self.currentGameData.team2Name,
		    			team2ScoreID : "team_2_score",
		    			isFinalID : "isFinal",
		    			isFinal : "isFinal",
		    		};

		    		$("#addGameScore").append(_.template(addSetSection)(templateData));


		    	//$("#addGameScore").append('<input type="text" id="whatHappend" value="">');
		    	$("#addGameScore").append('<input type="submit" id="submitScore" value="Submit">');
		    	self.addSetForum =  self.gameContainer.find("#addGameScore");	
		},

		submitGameScore: function(e){
			e.preventDefault();
			var self = this;

			var array = [];

			var setData = {game_id: this.currentGameData.gameID};
			self.addSetForum.children("#setSection").children("input").each(function(i, el) {
				if($(el).attr('type') == 'checkbox'){
					setData.is_final = ($(el).attr('checked') === "checked") ? true : false;
				}else{
					if($(el).attr('name') == 'set'){
						setData.set_number = $(el).val();
					}else if($(el).attr('name') == 'team_1_score'){
						setData.team_1_score = $(el).val();
					}else if($(el).attr('name') == 'team_2_score'){
						setData.team_2_score = $(el).val();
					}	
				}

			});

			var newGameScoreModel = new GameScoreModel(setData);
			newGameScoreModel.url = config.postGameScoreUrl;

			newGameScoreModel.save(newGameScoreModel.toJSON(), { //Uncaught TypeError: Object function (a){return new n(a)} has no method 'has' > Updated underscore (http://stackoverflow.com/a/9251047)
	            success: function(data) {						
	                console.log("succes save");
	                $("#addGameScore").remove();

	                console.log(data);
	                //self.collection.add(newGameScoreModel.toJSON());
	               	//self.repackData(setData, false);

	               	self.fetchSetCollection();
					console.log(self.collection);
	            },
	            error: function(data, error) {
	                console.log('error ' + error);
	                window.alert("De velden "+error+ " zijn niet ingevuld");

	            },
	            headers: {
	                Authorization: 'bearer ' + config.access_token
	            }
            });
		},

	});
  });
}());