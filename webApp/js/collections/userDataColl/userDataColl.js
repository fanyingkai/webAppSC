define(function(require, exports, module) {

    var baseColl = require('baseColl');
    var personalData = require('../../models/personalData/personalData');
    require('backbonelocalstorage');
    // 获取本地,基本个人信息 全局 session

    App.Collections.userDataColl = baseColl.extend({
        model: personalData,
        localStorage: new Backbone.LocalStorage("userDataColl"),
        initialize:function(){
            this.fetch();
            this.renderData();
            this.on("add update",this.renderData);
        },
        renderData:function(){
            
            var curUser=localStorage.getItem('curUser');
            var curUserData=this.localStorage.find({id:curUser});

            if(!curUserData){
                window.location.href='#login/login/';
            }

            try{
                    var snsUrl=curUserData.poolInfos.snsUrl;
                    var wapUrlSSL=curUserData.poolInfos.wapUrlSSL;
                    var wapUrl=curUserData.poolInfos.wapUrl;
                    var schoolId=curUserData.userInfo.schoolId;
                    var userId=curUserData.userInfo.userId;
                    var pickName=curUserData.userInfo.pickName;
                    var signature=curUserData.userInfo.signature;
                    var departmentName=curUserData.userInfo.departmentName;
                    var photo=curUserData.userInfo.photo;
                    var bgPicture=curUserData.userInfo.bgPicture;

                    var baseInfo= {
                            curUser:curUserData,
                            baseImgPath:snsUrl,
                            baseUrlPath:wapUrl,
                            schoolId:schoolId,
                            userId:userId,
                            pickName:pickName,
                            signature:signature,
                            departmentName:departmentName,
                            photo:photo,
                            bgPicture:bgPicture
                        };

                    window.App.baseInfo = baseInfo;

                }catch(ex){

                    console.log(ex)
                    window.location.href='#login/login/';
                }

        }

    });


    module.exports= App.Collections.userDataColl;
});
