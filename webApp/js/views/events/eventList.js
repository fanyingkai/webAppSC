define(function(require, exports, module) {
	// body...
	// 活动模块-- 嵌入 iframe 3.0页面,待修改
	var Backbone=require('backbone');

	var V=Backbone.View.extend({
		events:{

		},
		back: function(){
			window.history.back();
		},
		initialize: function() {
			var event=App.baseInfo.baseUrlPath+'/h5/activity_eventList.do?appType=ios&userId='+App.baseInfo.userId;
			if(this.$el.find('#iframe').length==0){
				this.$el.append('<iframe id="iframe" style="width: 100%;height: 90%;border: 0;margin: 0;padding: 0;overflow-y: scroll;position: fixed;top: 0;left: 0;z-index:1111;" src=""></iframe>');
			}
			this.$el.find('#iframe').attr('src',event);
			this.$el.show();
		}
	});

	return function(pars) {
		return new V({
			el: $("#" + pars.model + "_" + pars.action)
		});
	}
})