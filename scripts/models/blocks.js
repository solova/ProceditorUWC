/*
Колекция
*/
define([
    'jquery',
    'backbone',
    'models/block'
], function ($, Backbone, block) {
    'use strict';

    var Blocks = Backbone.Collection.extend({
    	model: block,
        initialize: function () {

        }
    });

    return Blocks;
});