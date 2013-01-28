(function () {"use strict";
    define([
        'util/util'
        ,'text!templates/schedule/game.html'
        ], 
        function (util, gameRowTemplate) {
            return Backbone.View.extend({
                tagName: "tr",

                events: {
                    "click": "navigateToGame",
                },

                // render de template
                render: function (collection) {
                    this.model.attributes.elementClass = "clickableTable";
                    
                    this.$el.html(_.template(gameRowTemplate)(this.model.toJSON()));
                    this.collection = collection;
                    
                    $(this.el).attr("class", this.model.attributes.elementClass);
                    return this;
                },

                navigateToGame:function (e){
                    window.location = $(e.currentTarget).find("a.gameLink").attr("href");
                } 
            }
        );
    });
}());