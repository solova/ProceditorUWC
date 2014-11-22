/*
Проекты
*/
define([
    'jquery',
    'backbone',
    'underscore',
    'views/blockview',
    'text!templates/project.html',
    'jqueryui'
], function ($, Backbone, _, BlockView, template) {

    'use strict';

    var ProjectView = Backbone.View.extend({

        template: _.template(template),

        initialize: function () {

            // this.collection.on('all', this.render, this);

            // this.collection.fetch();
            this.model.get('blocks').on('all', this.render, this);
            this.model.get('blocks').on('all', this.save, this);
            this.model.on('all', this.render, this);
        },

        events: {
            'click .add-block': 'addblock',
            'click .btn-clear': 'reset',
            'click .btn-remove': 'removezone'
        },

        addblock: function(e){
            e.preventDefault();

            var type = $(e.currentTarget).data('type');

            this.model.get('blocks').add({type: type});
            this.model.save();

            console.log('type', type);
        },

        reset: function(e){
            e.preventDefault();
            if (window.confirm('Усі блоки проекту буде знищено. Цю дію неможливо відмінити.')){
                this.model.get('blocks').reset();
                this.model.save();
            }
        },

        removezone: function(e){
            e.preventDefault();
            window.alert('Зона знищення блоків. Перетягніть непотрібний блок на цю кнопку.');
        },

        save: function(e){
            this.model.save();
        },

        // remove: function(e){
        //     e.preventDefault();
        //     console.log('remove');
        // },

        render: function () {

            this.$el.html(this.template(this.model.toJSON()));

            if (!this.model.get('blocks').isEmpty()){
                //TODO: refactoring to document fragment
                this.$("#canva").empty();
                var $list = $("<ul>");
                this.model.get('blocks').each(function(model){
                    var $view = new BlockView({model:model});
                    $list.append($view.render().el);
                }, this);
                this.$("#canva").append($list);
                $list.sortable();
            }
            
            return this;
        },
    });

    return ProjectView;
});