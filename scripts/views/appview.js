/*
Головне відображення
*/
define([
    'jquery',
    'backbone',
    'underscore',
    'marked',
    'models/projects',
    'views/projectslistview',
    'views/projectview',
    'text!templates/main.html',
    'text!templates/modal.html',
    'bootstrap',
    'jspdf'
], function ($, Backbone, _, marked, Projects, ProjectsListView, ProjectView, template, templatemodal) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        template: _.template(template),
        templatemodal: _.template(templatemodal),

        events: {
            'click .gettxt': 'showText',
            'click .getpdf': "downloadPDF"
        },

        initialize: function () {
            this.model.on('change:active', this.render, this);
        },

        showText: function(e) {
            e.preventDefault();
            if (this.model.get('active')){
                var project = Projects.get(this.model.get('active'));
                var result = "";
                var order = 1;
                project.get('blocks').each(function(block){
                    result += "Пункт " + order + "\n";
                    result += "=====================\n\n";
                    result += block.get('source');
                    result += "\n\n\n";
                    order++;
                });
                var params = {
                    header: project.get('name'),
                    content: marked(result)
                };
                var $modal = $(this.templatemodal(params));
                $modal.appendTo(document.body);
                $modal.modal('show');
                
            }else{
                window.alert('Не обрано жодного проекту');
            }
        },

        downloadPDF: function(e){
            e.preventDefault();
            //TODO: remove duplicate code
            if (this.model.get('active')){
                var project = Projects.get(this.model.get('active'));
                var result = "";
                var order = 1;
                var doc = new jsPDF();
                project.get('blocks').each(function(block){
                    result += "Пункт " + order + "\n";
                    result += "=====================\n\n";
                    result += block.get('source');
                    result += "\n\n\n";
                    order++;
                });
                result = marked(result);
                
                doc.fromHTML($('#canva').get(0), 15, 15, {
                    'width': 170, 
                });
                doc.save('project.pdf');
            }else{
                window.alert('Не обрано жодного проекту');
            }
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