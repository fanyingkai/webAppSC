define(function(require, exports, module) {
	var B = require('backbone');
	// var Promise = require('promise');
	var router = B.Router.extend({
		routes: {
			'': 'index',
			':model(/:action)(/*condition)': 'loadModel',
			'home/': 'home',
			'404': "error",
			"*error": "error"
		},
		initialize: function() {
			// this.route("help", "help", function(number){ console.log('help') });
			var userDataColl=require('js/collections/userDataColl/userDataColl');
			var bottomSliderBar=require('js/views/bottomSlider/bottomSliderBar');
			try{
	    		App.userDataFresh=new userDataColl();
	    		App.bottomSliderBarFresh=new bottomSliderBar();
	    	}catch(ex){
	    		console.log(ex);
	    		window.location.href="#login/login";
	    	}
			
		},
		index: function() {
			require.async('login', function(callObj) {
				new callObj;
			})
		},
		loadModel: function(md, ac, con) { //module/action(/conditions) 
			
			var viewParm = {
				model: md,
				action: ac
			}
			if (con && con.indexOf(':') > -1) {
				con.replace(/(\w+)\s*:\s*([\w-]+)/g, function(a, b, c) {
					if (b != "model" && b != "action") b && (viewParm[b] = c);
				});
			}
			B.$("#wrap").children("section").hide();
			var view = md + ac;

			if (view == 'loginlogin') {
				$('#bottom-slider').hide();
			} else {
				$('#bottom-slider').show();
			}

			$('#mask').show();
			if (!App.Views[view]) {
				// $('#mask').show();
				B.$("<section />").attr("id", md + "_" + ac).appendTo($("#wrap"));
				require.async(['js/views', md, ac].join('/'), function(callObj) {
					if (callObj) {
						App.Views[view] = callObj(viewParm);
						App.Views[view].viewParm = $.extend({}, viewParm);
					} else {
						console.log('error')
					}
				})
			} else {
				// myclasssay 
				if (md == 'classSay') {
					require.async(['js/views', md, ac].join('/'), function(callObj) {
						if (callObj) {
							App.Views[view] = callObj(viewParm);
							App.Views[view].viewParm = $.extend({}, viewParm);
						} else {
							console.log('error')
						}
					})
				}
				// myclasssay
				// 
				// event 
				if (md == 'event') {
					require.async(['js/views', md, ac].join('/'), function(callObj) {
						if (callObj) {
							App.Views[view] = callObj(viewParm);
							App.Views[view].viewParm = $.extend({}, viewParm);
						} else {
							console.log('error')
						}
					})
				}
				// event

				refreshData = false;
				$.each(App.Views[view].viewParm, function(i, item) {
					if (viewParm[i] != item) {
						refreshData = true;
						return false;
					}
				});
				if (refreshData) {
					delete viewParm["model"];
					delete viewParm["action"];
					App.Views[view].viewParm = $.extend({}, viewParm);
					App.Views[view].clearSelf && App.Views[view].clearSelf();
					App.Views[view].changePars && App.Views[view].changePars(viewParm);
				} else {
					App.Views[view].$el.show();
				}
				App.Views[view].syncRender && App.Views[view].syncRender(cj);
			}
			
			$(window).off('scroll');
			$('#mask').hide();
		}

	});



	window.App = {
		Models: {},
		Views: {},
		Collections: [],
		initialize: function() {
			var Router = new router();
			// Router.on("route:contact", function(page) {
			// 	console.log("contact")
			// });
			B.history.start() //{pushState: true,hashChange: false}
			// Router.navigate("#at/7/", {trigger: true, replace: true});

		}
	};

	exports.run = App.initialize;
})