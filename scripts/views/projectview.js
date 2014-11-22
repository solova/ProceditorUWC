/*
Відображення одного проекту
*/
define([
    'jquery',
    'backbone',
    'underscore',
    'views/blockview',
    'marked',
    'text!templates/project.html',
    'jqueryui'
], function ($, Backbone, _, BlockView, marked, template) {

    'use strict';

    var ProjectView = Backbone.View.extend({

        template: _.template(template),

        initialize: function () {

            // this.collection.on('all', this.render, this);

            // this.collection.fetch();
            this.model.get('blocks').on('all', this.render, this);
            this.model.on('all', this.render, this);

            _.bindAll(this, 'update');
        },

        events: {
            'click .add-block': 'addblock',
            'click .btn-clear': 'reset',
            'click .btn-remove': 'removezone'
        },

        addblock: function(e){
            e.preventDefault();

            var type = $(e.currentTarget).data('type');
            var params = {type: type, id: +(new Date()), order: +(new Date())};
            if (type == 'smile'){
                var rnd = Math.floor(Math.random()*5) + 1;
                params.source = "![Smile](smiles/" + rnd + ".png)";
                params.text = marked(params.source);
            }else if (type == 'image'){
                params.source = "![Image](http://placehold.it/512x256)";
                params.text = marked(params.source);
            }

            this.model.get('blocks').add(params, {silent:true});
            this.model.save();

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

        update: function() {
            console.log('update sort');
            var order = 1;
            var that = this;
            this.$('li').each(function(){
                that.model.get('blocks').get($(this).data('id')).set({order: order}, {silent:true});
                order++;
            });
            this.model.save();
        },

        // remove: function(e){
        //     e.preventDefault();
        //     console.log('remove');
        // },
        //
        //

        render: function () {
            console.log('proj render');
            window.RR = this;

            this.$el.html(this.template(this.model.toJSON()));

            if (!this.model.get('blocks').isEmpty()){
                //TODO: refactoring to document fragment
                this.$("#canva").empty();
                var $list = $("<ul>");
                this.model.get('blocks').each(function(model){
                    var $view = new BlockView({model:model, project: this.model});
                    $list.append($view.render().el);
                }, this);
                this.$("#canva").append($list);
                $list.sortable({ distance: 10, update: this.update });
            }
            
            return this;
        },
    });

    return ProjectView;
});