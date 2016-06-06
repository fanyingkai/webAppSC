define(function(require, exports, module) {
    var BAjax=require('baseModel');
    // 轮播图模板
    App.Models.slider = BAjax.extend({
        
        defaults: function() {  
            return {  
                "id": "",
                "adType": "",
                "adContent": "",
                "priority": '',
                "adPhotoUri": "",
                "adSize": ''
            };  
        },
        initialize: function() {  
  
        }
  
    }); 
    module.exports= App.Models.slider;
});