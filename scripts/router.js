define([
    'jquery',
    'backbone',
    'models/app'
    ], function ($, Backbone, App) {
        'use strict';

        var Router = Backbone.Router.extend({

            routes: {
                "": "reset",
                ":id": "open"  // #search/kiwis
            },

            reset: function(){
                console.log('reset');
                App.set('active', null);
            },

            open: function(id) {
                console.log('open project', id);
                App.set('active', id);
            }

        });

        return Router;
    });