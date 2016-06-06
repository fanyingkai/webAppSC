define(function(require, exports, module) {
	var Backbone=require('backbone');
    var BAjax=Backbone.Model.extend({
        url:'http://192.168.0.111:810/route/actionFormat.do',
        addOneFromServer : function(options) {
            return Backbone.ajaxSync('create', this, options);
        },
        deleteOneFromServer : function(options) {
            return Backbone.ajaxSync('delete', this, options);
        },
        updateOneFromServer : function(options) {
            return Backbone.ajaxSync('update', this, options);
        },
        selectOneFromServer : function(options) {
            return Backbone.ajaxSync('read', this, options);
        }
    });
    module.exports=BAjax;
})