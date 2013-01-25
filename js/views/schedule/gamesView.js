(function () {"use strict";
    define([
        'util/util'
        ,'text!templates/schedule/game.html'
        ], 
        function (util, gameRowTemplate) {
            return Backbone.View.extend({
                //standaard div, maak je table row van en komt in template terrecht
                tagName: "tr",

                // event klik op class delete en voer functie deleteGame uit
                events: {
                    "click .deleteGame": "deleteGame"
                },

                // Delete game model
                deleteGame: function (e) {
                    e.preventDefault();

                    var removeType = this.model.get("team2").toLowerCase();
                    var collection = this.collection;

                    this.model.destroy(); // delete model
                    this.remove(); // delete model van view
                    
                    if (_.indexOf(util.getTypes(collection, "team2"), removeType) === -1) { // delete model uit filter
                        $("#page").find("#filter select").children("[value='" + removeType + "']").remove();
                    }
                    
                },

                // render de template
                render: function (collection) {
                    this.$el.html(_.template(gameRowTemplate)(this.model.toJSON()));
                    this.collection = collection;
                    return this;
                }  
            }
        );
    });
}());