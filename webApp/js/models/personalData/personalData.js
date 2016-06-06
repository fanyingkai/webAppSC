define(function(require, exports, module) {
	// body...
    var $=require('$');
    var baseModel=require('baseModel');
	// var validate=require('validate');
	// var alert=require('alert');
    // require('backbonelocalstorage');
    // 
    // 本地数据模板 组织机构
    var userModel=baseModel.extend({
    	defaults:{
    		'userInfo':{},
            'schoolInfos':{},
            'poolInfos':{},
            'funcUser':{},
            'departSchool':{},
            'adPhotoSchool':{}
    	},
    	validate:function(attrs){

	    }
    })
	module.exports=userModel;
})

