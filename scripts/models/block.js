/*
Модель одного блоку графу
*/
define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var Block = Backbone.Model.extend({
    	defaults: {
    		type: 'square',
            source: "Створіть новий контент використовуючи markdown.",
            text: "Новий блок Натисніть, щоб додати контент.",
            url: "http://placehold.it/512x256",
            order: 0
    	}
    });

    return Block;
});