/*
Колекция
*/
define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var App = Backbone.Model.extend({
    	defaults: {
    		"active": null
    	}
    });

    return new App();
});