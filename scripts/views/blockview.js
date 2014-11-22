/*
Відображення одного блоку
*/
define([
    'jquery',
    'backbone',
    'underscore',
    'models/app',
    'marked',
    'text!templates/block.html'
], function ($, Backbone, _, App, marked, template) {

    'use strict';

    var BlockView = Backbone.View.extend({

        template: _.template(template),

        events: {
            'click': 'edit',
            'click .btn-save': 'save'
        },

        initialize: function(options){
            this.project = options.project;
        },

        edit: function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.$('.render').is(':visible')){
                this.$('.render, .editor').toggle();
            }
        },

        save: function(e){
            e.preventDefault();
            e.stopPropagation();
            if (this.$('.editor').is(':visible')){
                this.$('.render, .editor').toggle();
                this.model.set({
                    'source': this.$('textarea').val(),
                    'text': marked(this.$('textarea').val())
                }, {silent: true});
                this.project.save();
            }
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
    });

    return BlockView;
});