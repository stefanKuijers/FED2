(function () {
	"use strict";
	define([
		'config'
	    ,'util/util'
	    ,'models/apiGame'
		], 
		function (config, util, apiGameModel) {
			return Backbone.View.extend({

				el: $("#gameScore"),

				initialize: function (options) {
         			this.vent = options.vent;
         			this.gameID = options.id;

         			//console.log('gameID: ' + this.gameID); 

					var self = this;

					this.gameModel = new apiGameModel({id:this.gameID});

				    this.gameModel.fetch({
				    	success : function(data){
				    		console.log("model data: ", self.gameModel);
				    		
				    		self.render(self);	
				    	},
				    	error : function(){
				    		console.log("Error: game could not be retrieved");
				    		$("#gameScore").find("h1").remove();
				    		$("#gameScore").append('<h1>Sorry, I could not find a game with ID '+ self.gameID+'</h1>');
				    	}

				    });
				},

				render: function (scope){

					scope.vent.trigger('gameDataLoaded', {gameID:this.gameModel.get('gameID'), team1Name:this.gameModel.get('team1Name'), team1ID:this.gameModel.get('team1ID'), team2Name: this.gameModel.get('team2Name'), team2ID:this.gameModel.get('team2ID'),});

					var sb = new util.stringBuilder();

					sb.append('<h1>Pool');
					sb.append(' ');
					sb.append(this.gameModel.get('poolName'));
					sb.append(': ');
					sb.append((this.gameModel.get('team1Name') === this.gameModel.get('gameWinner')) ? "<span class='winner'>" + this.gameModel.get('team1Name') + "</span>" : this.gameModel.get('team1Name'));
					sb.append(' ');
					sb.append((this.gameModel.get('gameWinner') === null) ? ' vs. ' : this.gameModel.get('team1Score') + ' - ' +  this.gameModel.get('team2Score') );
					sb.append(' ');
					sb.append((this.gameModel.get('team2Name') === this.gameModel.get('gameWinner')) ? "<span class='winner'>" + this.gameModel.get('team2Name') + "</span>" : this.gameModel.get('team2Name'));
					sb.append('</h1>');

					$("#gameScore").find("h1").remove();
					$("#gameScore").append(sb.toString());
				}
			}
		);
	});
}());

