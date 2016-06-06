seajs.config({
	base: './',
	alias: {
	    tmpl : 'templates',
		underscore : 'js/lib/underscore/1.4.4/underscore',
		$ : 'js/lib/jquery/jquery',
		jquery : 'js/lib/jquery/jquery',
		jQuery : 'js/lib/jquery/jquery',
		// backbone : 'js/lib/backbone/0.9.10/backbone',
		backbone : 'js/lib/backbone/1.0.0/backbone',
		backbonelocalstorage : 'js/lib/backbone/backbone.localstorage/backbone.localStorage',
		// backbone : 'js/lib/backbone/1.2.3/backbone',
		baseModel : 'js/models/base/base',
		md5 : 'js/lib/md5/md5',
		baseColl : 'js/collections/base/baseColl',
		zepto : 'js/lib/zepto/zepto',
		slider : 'js/lib/slider/yxMobileSlider',
		promise : 'js/lib/promise/promise',
		validate : 'js/models/base/validate',
		alert : 'js/models/base/zepto.alert',
	},
	preload: ['plugin-text'],  
	map: [                                                                     
	    ['.tpl', '.tpl?p=20151208'],                                                    
	    ['.js', '.js?p=20151208']
	]
});

seajs.use('app', function(app) {
	app.run();
});