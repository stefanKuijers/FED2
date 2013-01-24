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

				initialize: function () {
					var self = this;

					this.gameModel = new apiGameModel();

				    this.gameModel.fetch({
				    	success : function(data){
				    		console.log("model data: ", self.gameModel);
				    		self.render();	
				    	}
				    });
				},

				render: function (){
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

