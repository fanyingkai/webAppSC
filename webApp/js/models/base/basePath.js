define(function(require, exports, module) {
    /*个人信息 本地数据 全局使用*/
	var userDataColl=require('js/collections/userDataColl/userDataColl');
    var userColls=new userDataColl();
    var curUser=localStorage.getItem('curUser');
    var curUserData=userColls.localStorage.find({id:curUser});

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

            return {
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
            }

        }catch(ex){

            console.log(ex)
            window.location.href='#login/login/';
        }
    

})