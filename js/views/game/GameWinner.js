(function () {"use strict";
	define([
	    'util/util'
		], 
		function (util) {
			return Backbone.View.extend({
				setWinners: [],

				calcWinner: function () {
				    var self = this;

				    _.each(this.collection.models, function (item) {	
				    	var curentSet = item.toJSON();
				    	this.setWinners.push(curentSet.setWinner);
				    }, this);
				    this.setWinners = util.compressArray(this.setWinners);
				},


				//bereken de Gamewinner op basis van de scores. 
				//Known error: als 1 team alle sets heeft gewonnen crasht het, Note: dit gedeelte was niet verplicht en is daarom niet verder uitgewerkt
				// Hier kan er wel wat naar de utils denk ik... of in een aparte functie binner deze view
				render: function (){
					var winner = new Object();
					var loser = new Object();
					
					winner.name = ((this.setWinners[0].count > this.setWinners[1].count) ? this.setWinners[0].value : this.setWinners[1].value);
					winner.score = ((this.setWinners[0].count > this.setWinners[1].count) ? this.setWinners[0].count : this.setWinners[1].count);

					loser.name  = ((this.setWinners[0].count > this.setWinners[1].count) ? this.setWinners[1].value : this.setWinners[0].value);
					loser.score = ((this.setWinners[0].count > this.setWinners[1].count) ? this.setWinners[1].count : this.setWinners[0].count);

					$("#gameWinner").append("<tr><td class='winner'>"+winner.name+"</td><td>" + winner.score + " - " + loser.score + "</td><td>"+loser.name+"</td></tr>");

				}

			}
		);
	});
}());

