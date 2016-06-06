define(function(require, exports, module) {
	// body...
	// 首页模块
	var $=require('$');
	var Backbone=require('backbone');
	var alert=require('alert');
	var bottomSliderBar=require('js/views/bottomSlider/bottomSliderBar');
	var home_tpl=require('templates/home.htm');
	
	var sliderView=require('js/views/viewPic');

	var W_height=document.body.scrollHeight||document.body.clientHeight;

	// 页面链接入口拼接
	var funHrefArr={
		"notice":'/h5/informsList.do?',
		"collection":'/h5/collectionList.do?',
		"campusOrg":'/h5/unclub_index.do?',
		"news":'/h5/newsList.do?',
		"campusService":'/h5/unservice_index.do?',
		"activity":'/h5/activity_eventList.do?',
		"welcome":'/h5/welcome_loadWelcomeList.do?',
		'sendAppNotice':''
	};

	var sliderSchoolM=Backbone.Model.extend({
		defaults:{
			actionUrl:'http://192.168.0.72:81/sc_user/user/departSchool.do',
			appType:'android'
		},
		url:'http://192.168.0.111:810/route/actionFormat.do'
	});


	var V=Backbone.View.extend({
		events:{
			'click #bottom-slider li':'bottomSliderTo',
			'click .schoolAbout':'sliderSchoolDetail',
			'click #school-intro':'schoolDetailClose'
		},
		initialize: function(C) {

			var self=this;
			App.bottomSliderBarFresh=new bottomSliderBar();
			App.bottomSliderBarFresh.render();
			this.$el.show()[0].style.height=W_height+'px';
			this.render();
			
		},
		render:function(){

			var self=this;
			var funcList=App.baseInfo.curUser.funcUser.funcList;
			var adPhotoSchoolList=App.baseInfo.curUser.adPhotoSchool.adPhotoSchoolList;
			var schoolLogo=App.baseInfo.curUser.schoolInfos.schoolLogo;
			var userId=App.baseInfo.userId;
			var departSchoolInfo=App.baseInfo.curUser.departSchool;
			
			_(funcList).each(function(item){
				item.funcHref=self._href_redirect(item.alias);
			});
			
			this.$el.show();
			var data ={data:funcList,schoolLogo:schoolLogo,path:App.baseInfo,departSchoolInfo:App.baseInfo.departSchoolList};
            this.$el.html(Mustache.render(home_tpl,data));
			new sliderView(adPhotoSchoolList);

		},
		_href_redirect:function(method){// 页面链接入口拼接
			return funHrefArr[method]=App.baseInfo.baseUrlPath+'/'+funHrefArr[method]+'appType=h5&userId='+App.baseInfo.userId;
		},
		sliderSchoolDetail:function(){

			var self=this;
			
			$('#school-intro').removeClass().addClass('bounceInLeft' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		    });
			$('body').css('overflow','hidden');
		},
		schoolDetailClose:function(){
			$('#school-intro').removeClass().addClass('bounceInRight' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				var _this=$(this); setTimeout(function(){_this.removeClass('bounceInRight animated');}, 1000)
		    });
			$('body').css('overflow','auto');
		},
		changePars:function(pars){
			this.render();
		}
	});

	return function(pars) {
		return new V({
			el: $("#" + pars.model + "_" + pars.action)
		});
	}
})