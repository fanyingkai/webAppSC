define(function(require, exports, module) {

    var Backbone = require('backbone');
    // 联合离线存储时,本地同步fetch和服务器同步fetch冲突, 解决同步服务器数据方法 
    var baseColl = Backbone.Collection.extend({
        refreshFromServer : function(options) {
            return Backbone.ajaxSync.call(this, 'read', this, options);
        },
        deleteFromServer : function(options) {
            return Backbone.ajaxSync.call(this, 'delete', this, options);
        },
        updateFromServer : function(options) {
            return Backbone.ajaxSync.call(this, 'update', this, options);
        },
        selectFromServer : function(options) {
            // return Backbone.ajaxSync.call(this, 'create', this, options);
        },
        addFromServer : function(options) {
            return Backbone.ajaxSync.call(this, 'create', this, options);
        }
    });

    module.exports= baseColl;
});
