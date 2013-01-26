(function () {"use strict";
	define([
		'util/util'
		,'text!templates/game/setTable.html'
		], 
		function (util, setTableTemplate) {
			return Backbone.View.extend({
				tagName: "tr",

				events: {
  					"click button#remove": "removeModel"
  				},

				//verwijder het geselecteerde model uit view
				//FIXED: Known issue: The data refering to this model in the #filters will not yet be removed
				removeModel: function(e){
					e.preventDefault();
					var removeType = this.model.get("setWinner");
                    var collection = this.collection;

					this.model.destroy();
				    this.remove();	
				    
				    if (_.indexOf(util.getTypes(collection, "setWinner"), removeType) === -1) { // delete model uit filter
                        $("#page").find("#filterSet").children("[value='" + removeType.toLowerCase() + "']").remove();
                    }
				},

				render: function (collection) { // render this view in its template
					$(this.el).html(_.template(setTableTemplate, {model: this.model,_: _}));
					this.collection = collection;
					return this;
				}
				
			}
		);
	});
}());