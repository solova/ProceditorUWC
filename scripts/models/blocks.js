/*
Колекція блоків
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

        },
        comparator: function(item) {
            return item.get('order');
        }
    });

    return Blocks;
});