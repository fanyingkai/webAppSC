define(function(require, exports, module) {
	// body...
	var Backbone=require('backbone');
	var userView=Backbone.View.extend({
		el:'body',
		events:{
			'click #bottom-slider li':'bottomSliderTo'
		},
		initialize: function(C) {
			this.M=new loginM;
		},
		bottomSliderTo:function(event){
			var type=$(this).data('type');
			alert(type)
		},
		login:function(){
			var self=this;
			var username=$(this.el).find('#username').val();
			var password=$(this.el).find('#password').val();
			var loginObj={'username':username,'password':password};
			this.M.set(loginObj,{validate:true});
			this.M.addOneFromServer({
				success:function(){
					
				},
				error:function(){
					self.M.save()
					console.log('登录信息同步至本地')
				}
			});
		}
	});

	module.exports=userView;
})