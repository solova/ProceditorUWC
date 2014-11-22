/*
Колекция
*/
define([
    'jquery',
    'backbone',
    'models/blocks'
], function ($, Backbone, Blocks) {
    'use strict';

    var Project = Backbone.Model.extend({
    	defaults: {
    		name: "Undefined",
            blocks: new Blocks()
    	},
        parse: function(response) {
            response.blocks = new Blocks(response.blocks);
            return response;
        }
    });

    return Project;
});