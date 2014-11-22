/*
Проекти
*/
define([
    'jquery',
    'backbone',
    'underscore',
    'models/app',
    'text!templates/projectslist.html',
    'text!templates/projectslistitem.html'
], function ($, Backbone, _, App, template, templateitem) {

    'use strict';

    var ProjectsListView = Backbone.View.extend({

        template: _.template(template),
        templateitem: _.template(templateitem),

        events: {
            'click .project-add': 'add',
            'click .project-remove': 'remove'
        },

        initialize: function (options) {

            this.collection.on('all', this.render, this);

            this.collection.fetch();

        },

        add: function(e){
            e.preventDefault();
            
            var projectName = window.prompt('Enter Project Name');
            this.collection.create({name: projectName},{silent:true});
        },

        remove: function(e){
            e.preventDefault();
            console.log('remove');
        },

        render: function () {
            this.$el.html(this.template());

            this.$('.list').empty();

            if (this.collection.isEmpty()){
                this.$(".list").remove();
                this.$el.append("No projects");
            }else{
                //TODO: refactor to document fragment

                this.collection.each(function(model){

                    var $item = $(this.templateitem(model.toJSON()));
                    $item.toggleClass('active', model.get('id') == App.get('active'));
                    this.$('.list').append($item);
                }, this);
            }
            
            return this;
        },
    });

    return ProjectsListView;
});