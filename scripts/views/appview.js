/*
Головне відображення
*/
define([
    'backbone',
    'underscore',
    'models/projects',
    'views/projectslistview',
    'views/projectview',
    'text!templates/main.html'
], function (Backbone, _, Projects, ProjectsListView, ProjectView, template) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        template: _.template(template),

        initialize: function () {
            this.model.on('change:active', this.render, this);
            window.PP = Projects;
        },

        render: function () {
            this.$el.html(this.template());

            this.projectsListView = new ProjectsListView({
                el: this.$('#projectslist'),
                collection: Projects
            });
            this.projectsListView.render();

            if (this.model.get('active')){
                this.projectView = new ProjectView({
                    el: this.$("#project"),
                    model: Projects.get(this.model.get('active'))
                });
                this.projectView.render();
            }


            return this;
        },
    });

    return AppView;
});