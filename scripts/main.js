'use strict';

require.config({ //налаштування requirejs
	paths: {
		jquery: '../vendor/jquery/jquery-2.1.1',
		jqueryui: '../vendor/jquery-ui/jquery-ui',
		underscore: '../vendor/lodash/lodash',
		backbone: '../vendor/backbone/backbone',
		bootstrap: '../vendor/bootstrap/bootstrap',
		localstorage: "../vendor/backbone/backbone.localstorage",
		marked: "../vendor/marked/marked",
		templates: '../templates',
		text: '../vendor/requirejs/text',
		jspdf: '../vendor/jspdf/jspdf'
	},
	shim: {
        "jqueryui": {
            exports: "$",
            deps: ['jquery']
        },
        "bootstrap" : { 
        	deps :['jquery'] 
        },
        "jspdf": {}
    }
});

require([
	'backbone',
	'router',
	'models/app',
	'views/appview'
], function (Backbone, Router, App, AppView) {
	console.log(arguments);
	var app = new AppView({ model: App });
	app.render();

	new Router();
	Backbone.history.start({pushState: false});
});