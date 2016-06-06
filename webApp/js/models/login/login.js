define(function(require, exports, module) {
	// body...
    //  登录model层 
    var $=require('$');
    var baseModel=require('baseModel');
	var validate=require('validate');
	var alert=require('alert');
    require('backbonelocalstorage');
    
    var userModel=baseModel.extend({
    	defaults:{
    		'userName':"",
    		'password':"",
            'appType': 'android',
            'verAdPhoto': 0,
            'verDepart': 0,
            'verDetail': 0, 
            'verFunc': 0,
            'verPoolAddress': 0,
            'verProfile': 0,
            'version': "0",
            'actionUrl':'http://192.168.0.82:81/sc_mc/system/loginThr.do'
    	},
    	// url:'http://192.168.0.82:81/sc_mc/system/loginThr.do',
        localStorage:new Backbone.LocalStorage("userDB"),
        initialize:function(){
            // 
            // 登录，本地账户切换，导航刷新
            this.on("change:userName", function (model) {  
                App.userDataFresh.renderData();
                
            }); 

        },
    	validate:function(attrs){/*数据登录校验*/

	        if(!validate.isEmpty(attrs.userName)){
	             $.dialog({
                    content : '用户名不能为空！',
                    title: "alert",
                    time : 1500
                });
                throw 'empty';
	            return false;
	        }
	        if(!validate.isEmpty(attrs.password)){
	        	$.dialog({
                    content : '密码不能为空！',
                    title: "alert",
                    time : 1500
                });
                throw 'empty';
	            return false;
	        }

	    },
        recover:function(){
            this.set('userName','');
            this.set('password','');
        }
    })
	module.exports=userModel;
})

