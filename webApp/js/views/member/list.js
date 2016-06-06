define(function(require, exports, module) {
	// body...
	// 好友 喜欢的人列表,关注,查看个人主页
	var $ = require('$');
	var Backbone = require('backbone');
	var person_items_tpl = require('templates/others/person_items.htm');
	var alert = require('alert');

	/*人员model*/
	var memM = Backbone.Model.extend({
		defaults: {
			appType: 'android',
			pageIndex: 0,
			pageSize: 12,
			actionUrl: 'http://192.168.0.72:81/sc_user/user/myLikesUser.do',
		},
		pageUp: function() {
			this.set('pageIndex', this.get('pageIndex') + 1);
		},
		clearPage: function() {
			this.set('pageIndex', 0);
		}
	});

	/*喜欢的人人员列表*/
	var memColl = Backbone.Collection.extend({
		model: memM,
		url: 'http://192.168.0.111:810/route/actionFormat.do'
	});

	/*关注*/
	var interestM = Backbone.Model.extend({
		url: 'http://192.168.0.111:810/route/actionFormat.do',
		defaults: {
			appType: 'android',
			remarkName: '',
			actionUrl: 'http://192.168.0.72:81/sc_user/user/followUser.do'
		}
	});


	var V = Backbone.View.extend({
		isPageUp: true,
		events: {
			'click .samebox': 'likeMem',
			'scroll #member_list': 'likeMem',
			'touchstart .no-interest': 'interestOpera'
		},
		initialize: function() {

			this.render();

			$(window).bind('scroll', this.doScroll);
		},
		render:function(){
			self=this;
			this.memColl = new memColl({
				userId: App.baseInfo.userId
			});

			this.memModel = new memM({
				TargetId: this.id,
				userId: App.baseInfo.userId
			});

			this.isPageUp = false;
			this.likeMem(0);
		},
		doScroll: function(event) { /*滑动分页*/

			a = document.documentElement.clientHeight;
			b = $(window).scrollTop();
			c = document.documentElement.scrollTop == 0 ?
				document.body.scrollHeight :
				document.documentElement.scrollHeight;

			if (self.isPageUp && a + b >= (c - 10)) {
				self.isPageUp = false;
				self.likeMem(self.list_type);
			}

		},
		interestOpera: function(event) {
			console.log(event)
			var followUserId = event.currentTarget.getAttribute('data-userid');
			var models = new interestM({
				followUserId: followUserId,
				type: 0,
				userId: App.baseInfo.userId
			});

			models.fetch({
				type: 'get',
				dataType: "jsonp",
				jsonp: "functionName",
				functionName: "lgCallback",
				data: models.toJSON(),
				success: function(data) {
					if (data.code == 0) {
						$.dialog({
							content: '关注成功！',
							title: "alert",
							time: 1500
						})
						$(event.currentTarget).attr('class', '').addClass('interested').text('已关注');
					} else {
						$.dialog({
							content: '关注失败！',
							title: "alert",
							time: 1500
						})
					}
				},
				error: function(status, errorType, thr) {
					$.dialog({
						content: '关注失败！',
						title: "alert",
						time: 1500
					})
					console.log(status);
					console.log(errorType);
					console.log(thr);
				}
			});
		},
		changePars:function(pars){
			this.id=pars.id;
			this.render(pars.id);
		},
		likeMem: function(event) { /*喜欢的人列表*/
			if (!event) {
				self.memModel.set('actionUrl', 'http://192.168.0.72:81/sc_user/user/myLikesUser.do');
				self.list_type = 'mylike';
			} else if (event == 'mylike' || event == 'likeme') {

			} else {
				if (event && event.currentTarget.getAttribute('data-value') == 'mylike') {
					self.memModel.set('actionUrl', 'http://192.168.0.72:81/sc_user/user/myLikesUser.do');
					self.list_type = 'mylike';
					self.memModel.clearPage();
				} else if (event && event.currentTarget.getAttribute('data-value') == 'likeme') {
					self.memModel.set('actionUrl', 'http://192.168.0.72:81/sc_user/user/likeMesUser.do');
					self.list_type = 'likeme';
					self.memModel.clearPage();
				}
			}
			self.memColl.parse = function(data) {
				return data.result;
			};
			self.memColl.fetch({
				type: 'get',
				dataType: "jsonp",
				jsonp: "functionName",
				functionName: "lgCallback",
				data: self.memModel.toJSON(),
				success: function(data) {
					// collInterest.reset(data.get('result'))
					var curPage = self.memModel.get('pageIndex');
					var data = self.memColl.toJSON();

					data.baseInfo = App.baseInfo;
					data.pageIndex = curPage;
					data.result = data;
					data.list_type = self.list_type;

					var _html = _.template(person_items_tpl, data);

					if (curPage == 0) {
						$(self.el).html(_html);
					} else {
						$(self.el).append(_html);
					}
					self.$el.show();
					self.memModel.pageUp();
					self.isPageUp = true;
				},
				error: function(status, errorType, thr) {
					console.log(status);
					console.log(errorType);
					console.log(thr);
				}
			});
		}
	});

	return function(pars) {
		return new V({
			el: $("#" + pars.model + "_" + pars.action),
			id: pars.id
		});
	}
})