define(function(require, exports, module) {
    // body...
    // 轮播图模块
    // require('css/slider.css');
    var slider = require('slider');
    var data = require('./data');
    var Backbone = require('backbone');
    var collectPic = require('../collections/collectPic');
    var slidertpl = require('tmpl/others/slider.htm');
    var contentImg_width=document.body.clientWidth>424 ? 424:document.body.clientWidth;
    var contentImg_height=contentImg_width*859/1242;

    App.Views.slider = Backbone.View.extend({
        el: '#container',
        events:{
            "click #container":'addPic'
        },
        initialize: function(c) {
            var self=this;
            this.Collections=c;
            var collection = this.Collections;
            this.listenTo(collection, 'add', this.imgClick);
            this.listenTo(collection, 'change:name', this.changeName);
            this.listenTo(collection, 'reset', this.changeName);
            // collection.refreshFromServer({success: function(freshData) {
            //     collection.reset(freshData.result);
            //     collection.each(function(model) {
            //         model.save();
            //     });
            //     self.render();
            // }});

            // self.Collections.fetch().done(function() {
            //     self.render();
            // }); 
            // this.Collections.parse=function(data){
            //     return data;
            // };

            // this.Collections.fetch(
            //     {   
            //         success: function (collection, response) { 
            //            console.log('===============++collection')
            //            console.log(collection)
            //            console.log('===============++collection')
            //            self.render();
            //         }
            //     }
            // );
            // this.Collections.addFromServer();
            // this.Collections.models[0].updateOneFromServer();
            self.render();
            console.log('this.Collections');
            console.log(this.Collections);
        },
        render: function() {
            var sliderData={path:App.baseInfo,pics:this.Collections.toJSON()}
            var data ={data:sliderData};
            $('.sliderBox',this.el).remove();
            $(this.el).html(Mustache.render(slidertpl,data));
            $('.sliderBox',this.el).yxMobileSlider({width:contentImg_width,height:contentImg_height,during:3000});
            // this.Collections.deleteAll();
        },
        imgClick:function(){
            console.log('addPic')
        },
        listPic:function(){
            var str_listPic=this.Collections.getIds();
            console.log('==============str_listPic===========')
            console.log(str_listPic);
            console.log('==============str_listPic===========')
            console.log('==============this.model===========')
            console.log(this.Collections.models[0]);
            console.log('==============this.model===========')
            return this;
        },
        addNewAttr: function (i) {
            return {
                name:'name'+i,
                img: 'img/img'+i+'.png'
            };
        },
        addPic:function(){
            var i=this.Collections.models.length-5;
            this.Collections.create(this.addNewAttr(i));
        },
        updatePic:function(i,name){
            this.Collections.updatePic(i,name);
            return this;
        },
        removePic:function(i){
            this.Collections.models[i].destroy();
            return this;
        },
        selectPic:function(name){
            var b=this.Collections.find(function(model){
                return model.get('name')==name;
            });
            console.log(b)
            return this;
        }
    })

    // return function() {
    //     var hc = new App.Collections.slider();
    //     for (var i = 1; i < 6; i++) {
    //         hc.add([
    //             {'name': 'name'+i, 'img': 'img/img'+i+".png"},
    //         ]);
    //     };
    //     new App.Views.slider(hc);
    // }
    

    module.exports = function(list,imgBaseUrl){
        new App.Views.slider(new collectPic(list),imgBaseUrl);
    };
})