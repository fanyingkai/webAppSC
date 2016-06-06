define(function(require, exports, module) {

    var modelPic = require('../models/pic/modelPic');
    var Backbone = require('backbone');
    require('backbonelocalstorage');
    

    App.Collections.slider = Backbone.Collection.extend({
        model: modelPic,
        url:"data",
        localStorage: new Backbone.LocalStorage("sliderCopy"),  
        initialize: function(models) {
            this.on("add",this.addpic);
            this.on("create",this.slidercreate);
        },
        getIds: function() {
            return _(this.models).map(function(model) {
                    return model.cid+" "+model.get('name');
            }).join(',');
        },
        listView:function(){
    		return _(this.models).map(function(model) {
                    return model.cid+","+model.get('name');
            }).join(';');
        },
        updatePic:function(i,name){
        	this.at(i).save('name',name);
        },
        addpic:function(model){
            console.log("=================addmodel===============")
            console.log(model)
            console.log("=================addmodel===============")
        },
        createAll: function(options) {
            return Backbone.sync.call(this, 'create', this, options);
        },
        updateAll: function(options) {
            return Backbone.sync.call(this, 'update', this, options);
        },
        deleteAll: function(options) {
            var result = Backbone.sync.call(this, 'delete', this, _.extend({
                    url: this.url + '?delValue=' + this.getIds()
            },
            options));
            this.remove(this.models);
            return result;
        },
        slidercreate:function(models){
            _(models).each(function(model){
                this.create(model);
            })
        }
    });

    module.exports= App.Collections.slider;
});
