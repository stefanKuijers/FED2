(function () {
  "use strict";
  define([
    'config'
    ,'models/Set'
    ,'collections/Game'
    ,'views/game/GameSet'
    ,'views/game/GameWinner'
    ,'text!templates/game/game.html'
    ,'util/util'
    ], function (config, SetModel, GameCollection, SetView, WinnerView, page, util) {
      return Backbone.View.extend({
	
		el: $("#page"),

		initialize: function () {
		    this.collection = new GameCollection(config.data.game); 

		    this.on("change:filterTypeGame", this.filterByOptions, this);

		    this.collection.on("reset", this.render, this);
		    this.collection.on("addSet", this.renderSet, this);
		    this.collection.on("remove", this.removeSet, this);
	  	},

	  	//assign events
	  	events: {
	  		"click #addSet": "addAction",
	  		"change #gameFilter select": "setFilter"
	  	},

	  	//render de view
	  	render: function (initialize) {
	  		if (initialize === true) {
	  			$("#page").html(_.template(page));
	  			this.gameTable =  this.$el.find("#gameResult");
		    	this.addSetForum =  this.$el.find("#addGameSet");

		    	var winnerView = new WinnerView();
		    	winnerView.collection = this.collection;
		    	winnerView.calcWinner();

		    	winnerView.render(winnerView.winnerArray);

		    	$("#gameFilter").append(this.createFilterOptions());
	  		}

	  		$("#gameResult").find("tr:gt(0)").remove(); //http://stackoverflow.com/a/370031/1136000

		    var self = this;
		    _.each(this.collection.models, function (item) {self.renderSet(item);}, this);
		},

		//render de verschillende sets 
		renderSet: function (item){
			$("#gameResult").append(new SetView({model: item}).render(this.collection).el);
		},

		//actie voor het toevoegen van een set
		addAction: function(e){
			e.preventDefault(); 
			var newSet = {};
			var inputError = false;
			//Voer vvoor elk child input van het form addGameSet de functie uit die de data uit de velden aan het set object toevoegd
			this.addSetForum.children("input").each(function(i, el) {
				if($(el).val() !== ""){
					newSet[el.id] = $(el).val();
				}
				else{ //zet de boolean inputError op true als er één of meerdere velden
					inputError = true;
				}
			});
			if(!inputError){ //Uitvoeren indien er geen inputError gedetecteerd is
				this.addSetForum.children("input").each(function(i, el) {$(el).val("");}); //reset de velden van het input form
				config.data.game.push(newSet); //voeg de nieuwe set toe aan de gamedata array
				var thisSet = new SetModel(newSet); //
				if(_.indexOf(util.getTypes(this.collection, "setWinner"), thisSet.attributes.setWinner) === -1) { //als de winnaar nog niet voor komt wordt deze toegevoegd aan de filter picker (kan ook een tie zijn)
					this.collection.add(thisSet); //voeg de nieuwe set toe aan de collection
					this.$el.find("#gameFilter").find("select").remove().end().append(this.createFilterOptions()); //reset de filter picker
				}else{// de winnaar is al bekend
					this.collection.add(thisSet);
				}
				this.collection.reset(config.data.game);
			}
			else{ //Execute alert naar de gebruiker dat er 1 of meerdere velden niet zijn ingevuld
				alert("U heeft een veld niet ingevuld");
			}
		},

		removeSet: function (model) {
			console.log("removeSet");
			var toRemove = model.attributes;
			delete toRemove["setWinner"]; //verwijder het attribute setWinner van het object, dit zorgt er voor dat het object overeen komt met de orininele data en kan worden vergeleken in _.isEqual

			_.each(config.data.game, function (item) {
		        if (_.isEqual(item, toRemove)) {
		           config.data.game.splice(_.indexOf(config.data.game, item), 1);
		        }
		    });
		},


		createFilterOptions: function () { //creeer filteropties: standaardfilter: op sets volgorde. Dynamic filters: set winnaars (waaronder tie)
		    var filter = this.$el.find("#gameFilter"),
		    htmlString = $("<select/>", { id: "filterSet", html: "<option value='sets'>Sets</option>"});
		    if(util.getTypes(this.collection, "setWinner").length > 1){
				_.each(util.getTypes(this.collection, "setWinner"), function (item) {
					        var option = $("<option/>", {
					            value: item.toLowerCase(),
					            text: "Winaar: " + item.toLowerCase()
					        }).appendTo(htmlString);
				});
		    }
		    return htmlString;
		},

		filterByOptions: function () { //voer opgegeven fileroptie uit
		    if (this.filterType === "sets") { 
		        this.collection.reset(config.data.game);
		    }else {
		        this.collection.reset(config.data.game, { silent: true });
		        var filterType = this.filterType,
		            filtered = _.filter(this.collection.models, function (item) {
		            return item.get("setWinner").toLowerCase() === filterType;
		        });
		        this.collection.reset(filtered);
		    }
		},

		setFilter: function (e) { //zet de opgegeven filer en vuur een custom trigger af voor dit event
		    this.filterType = e.currentTarget.value;
			this.trigger("change:filterTypeGame");
		}
	});
  });
}());