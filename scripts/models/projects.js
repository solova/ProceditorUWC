/*
Колекція проектів
*/
define([
    'jquery',
    'backbone',
    'models/project',
    'localstorage'
], function ($, Backbone, project) {
    'use strict';

    console.log('init collection');

    var Projects = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("SomeCollection"),
        model: project,
        initialize: function () {

        }
    });

    return new Projects;
});