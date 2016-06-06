define(function(require, exports, module) {
	// body...
	// 登录模块 登录校验,同步登录信息, 本地持久化,
	require('css/login.css');
	var login_tpl=require('templates/login.htm');
	var Backbone=require('backbone');
	var alert=require('alert');
	var md5=require('md5');
	var loginM=require('js/models/login/login');
	var userDataColl=require('js/collections/userDataColl/userDataColl');
	var userColls=new userDataColl();
	var userView=Backbone.View.extend({
		events:{
			'click #loginSubmit':'login'
		},
		initialize: function(C) {
			this.M=new loginM;
			this.$el.html(login_tpl)
			this.$el.show();
		},
		login:function(){
			var self=this;
			// var crossDomainIframe=$(this.el).find('#crossDomainIframe')[0];
			// var crossWindow=crossDomainIframe.contentWindow;
			var username=$(this.el).find('#username').val();
			var password=$(this.el).find('#password').val();
			password=md5(password+'{uskytec}');
			var loginObj={'userName':username,'password':password};
			try{
				this.M.set(loginObj,{validate:true});
				this.M.addOneFromServer({
					type:'get',
					dataType:"jsonp",
	             	jsonp:"functionName",
	             	functionName:"lgCallback",
					data:this.M.toJSON(),
					success:function(data){
						console.log('login--组织信息成功返回');
						if(data.code!='0'){
							$.dialog({
			                    content : '登陆失败',
			                    title: "alert",
			                    time : 1500
			                })
			                self.M.clear();
			                return;
						}
						var result=data.result;
						try{
							localStorage.setItem('curUser',username);
							result.id=username;
							var curUserId=result.userInfo.userId
							userColls.create(result);
							console.log(userColls)
							console.log('login--登录信息同步至本地')
							self.M.recover();

							$.dialog({
			                    content : '登陆成功',
			                    title: "alert",
			                    time : 1500,
			                    callback:function(){
			                        window.location.hash='#home/home/Uid:'+curUserId+'/';
			                    }
			                })
						}catch(e){
							self.M.clear();
							console.log(e.name + ": " + e.message);
							$.dialog({
			                    content : '信息同步至本地失败！',
			                    title: "alert",
			                    time : 1500
			                })
						}
						
					},
					error:function(status,errorType,errorThrown){
						self.M.clear();
						$.dialog({
		                    content : '登陆失败，请重新登陆！',
		                    title: "alert",
		                    time : 1500
		                })
						console.log('登录信息返回错误')
						console.log(status);
						console.log(errorType);
						console.log(errorThrown);
					},
					wait:true,
	    			emulateJSON:true
					// contentType:"application/x-www-form-urlencoded"
				});
			}catch(ex){
				console.log(ex);
				this.M.clear();
			}
			// crossWindow.postMessage(this.M.toJSON(),"*");
			// window.onmessage=function(e){
			// 	var e=event||e;
			// 	console.log('log_main========');
			// 	console.log(e.data);
			// 	self.navigate("#home/home/", {trigger: true, replace: true});
			// }

			
		}
	});

	return function(pars) {
		return new userView({
			el: $("#" + pars.model + "_" + pars.action)
		});
	}
})