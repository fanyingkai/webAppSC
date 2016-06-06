define(function(require, exports, module) {
	// body...
	// 底部悬浮导航栏模块-- 
	var Backbone=require('backbone');
	var bottom_slider_tpl=require('templates/others/bottom_slider.htm');

	var V=Backbone.View.extend({
		el:'#bottom-slider',
		events:{
			'click li':'tab'
		},
		tab:function(event){
			var imgs=this.$el.find('img');
			this.$el.find('img').filter(function(index){
				imgs[index].src=imgs[index].src.replace("_on",'');
			});
			var curTab=$('a img',event.currentTarget)[0];
			curTab.src=curTab.src.split('.png')[0]+'_on.png';
		},
		initialize: function() {
			this.render();
		},
		render:function(){
			this.$el.find("ul").html(_.template(bottom_slider_tpl,{'userId':App.baseInfo.userId}));
			var first=this.$el.find('img').first()[0];
			first.src=first.src.split('.png')[0]+'_on.png';
			this.$el.show();
		}
	});

	module.exports=V;
})