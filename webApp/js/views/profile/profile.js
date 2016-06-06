define(function(require, exports, module) {
	// body...
	// 个人信息模块
	var Backbone = require('backbone');
	var profile_tpl = require('templates/profile.htm');
	var alert = require('alert');
	var clientHeight = window.screen.height;

	var M = Backbone.Model.extend({
		defaults: {
			actionUrl: 'http://192.168.0.72:81/sc_user/user/likeUser.do'
		},
		url: 'http://192.168.0.111:810/route/actionFormat.do'
	});

	var profilInfoM = Backbone.Model.extend({
		defaults: {
			actionUrl: 'http://192.168.0.72:81/sc_user/user/profileUser.do',
			appType: 'android'
		},
		url: 'http://192.168.0.111:810/route/actionFormat.do'
	});



	var V = Backbone.View.extend({
		events: {
			'click .profile-func a': 'profileIframeScroll',
			'click #like': 'like'
		},
		initialize: function(pars) {

			self = this;
			if (this.id == "0") {
				this.id = App.baseInfo.userId;
			}
			this.profilInfoModel = new profilInfoM();
			this.profilInfoModel.set({
				userId: App.baseInfo.userId,
				targetId: this.id
			});
			this.listenTo(this.profilInfoModel, 'change:targetId', this.render);
			this.render();

		},
		render: function() {
			var self = this;

			var userId = App.baseInfo.userId;
			var pickName = App.baseInfo.pickName;
			var signature = App.baseInfo.signature;
			var schoolId = App.baseInfo.schoolId;
			var departmentName = App.baseInfo.departmentName;
			var photo = App.baseInfo.photo;
			var bgPicture = App.baseInfo.bgPicture;

			self.profilInfoModel.fetch({
				type: 'get',
				dataType: "jsonp",
				jsonp: "functionName",
				functionName: "lgCallback",
				data: self.profilInfoModel.toJSON(),
				success: function(data) {
					if (data.get('code') == '0') {
						var profile_hrefs = self.funHrefArr(self.id);
						var data = {
							data: data.get('result'),
							path: App.baseInfo,
							funHrefArr: profile_hrefs
						};
						// $(window).scroll(self.profileIframeScroll);
						self.$el.html(_.template(profile_tpl, data));
						self.$el.show();
						self.funcStudent();
					} else {
						$.dialog({
							content: '网络繁忙！',
							title: "alert",
							time: 1500
						})
					}
				},
				error: function() {
					console.log('error')
					$.dialog({
						content: '网络繁忙！',
						title: "alert",
						time: 1500
					})
				}
			});
		},
		changePars: function(pars) { /*重置模板*/
			this.id = pars.id;
			this.profilInfoModel.set({
				'targetId': this.id
			});
		},
		back: function() {
			window.history.back();
		},
		funHrefArr: function(userId) {
			var funHref = {
				"collection": App.baseInfo.baseUrlPath + '/h5/collectionList.do?&appType=ios&version=3.0&userId=' + userId,
				"activity": App.baseInfo.baseUrlPath + '/h5/activity_eventList.do?&appType=ios&userId=' + userId,
				"group": App.baseInfo.baseUrlPath + '/h5/activity_eventList.do?&appType=ios&userId=' + userId,
				"classsay": App.baseInfo.baseUrlPath + '/h5/dynamic_listClassSay.do?&refreshCount=1&netWorkType=wifi&isRefresh=true&appType=ios&type=hot&userId=' + userId + '&schoolId=' + App.baseInfo.schoolId
			};
			return funHref;
		},
		like: function(event) { /*喜欢点心*/
			console.log(event)
			if (this.id == App.baseInfo.userId) {
				window.location.href = "#member/list/id:" + App.baseInfo.userId + '/';
				return false;
			}
			var currentTarget = event.currentTarget;
			var className = currentTarget.className;
			var aft = className == 'like' ? 'unlike' : 'like';
			var _abs_prai = className == 'like' ? -1 : 1;
			var model = new M({
				userId: App.baseInfo.userId,
				targetId: this.id
			});
			model.fetch({
				type: 'get',
				dataType: "jsonp",
				jsonp: "functionName",
				functionName: "lgCallback",
				data: model.toJSON(),
				success: function() {
					currentTarget.className = aft;
					currentTarget.children[0].innerText = _abs_prai + Number(currentTarget.children[0].innerText);
				},
				error: function() {
					console.log('error')
				}
			});
		},
		funcStudent: function(event) {
			var profile_hrefs = this.funHrefArr(this.id);
			var classSaypath = profile_hrefs.classsay;
			this.$el.find('#profileIframe').css('height', clientHeight);
			this.$el.find('#profileIframe').attr('src', classSaypath);
		},
		profileIframeScroll: function(event) {
			console.log(event.currentTarget.getAttribute('_href'))
			// self.$el.find('#top-bar').hide();
			// var offsetTop=self.$el.find('#profileIframe')[0].offsetTop;
			// window.scrollTo(0,offsetTop);

		}
	});

	return function(pars) {
		return new V({
			el: $("#" + pars.model + "_" + pars.action),
			id: pars.id
		});
	}
})