define(function(require, exports, module) {
	// body...
	var Backbone=require('backbone');
	var alert=require('alert');
	var baseInfo=require('js/models/base/basePath');
	var profile_tpl=require('templates/setting/index.htm');
	var userDataColl=require('js/collections/userDataColl/userDataColl');
    var userColls=new userDataColl();
    var curUser=localStorage.getItem('curUser');
    var W_height=document.body.scrollHeight||document.body.clientHeight;
	
	var V=Backbone.View.extend({
		events:{
			'click .logOut':'logOut'
		},
		initialize: function() {
			this.$el.html(profile_tpl)[0].style.height=W_height+'px';
		},
		logOut:function(){
			_(userColls.models).each(function(model){
				if(model.get('id')==curUser){
					model.destroy();
					$.dialog({
	                    content : '退出登录！',
	                    title: "alert",
	                    time : 1500
	                });
	                Backbone.history.loadUrl('#login/login/');
				}
			})
		}
	});

	return function(pars) {
		return new V({
			el: $("#" + pars.model + "_" + pars.action)
		});
	}
})