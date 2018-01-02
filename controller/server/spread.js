var express = require('express');
var router = express.Router();
router.get('/spread/:userId' ,function(req , res  , next){
  req.session.spreadUserId = req.params.userId;
  useSession.save(req , res , next);
}, useValidate.hasWechat, function(req, res, next) {
    res.redirect(useCommon.addUrlParam('/server/qrcode/spread',{
      uid:req.session.unionid,
      spreadUserId:req.session.spreadUserId,
    }));
});
router.get('/spread' , function(req, res, next) {
    if(!req.session.spreadUserId)return res.redirect('/');
    res.useRender('index');
});
router.post('/spread' ,  function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.sms.check,
    data:{
      sendType:req.body.sendType || 'BINDING',
      phone:req.body.phone,
      sendCode:req.body.smsCode,
      ip:req.remoteAddress,
    },
    method:'POST',
    notBody:1,
    done:function(a){
      if(a.code === 0){
        useRequest.send(req , res , {
          url:useUrl.login.bindUser,
          data:{
            uid:req.session.unionid,
            openId:req.session.openId,
            mobile:req.body.phone,
            nickname:req.session.wechatData.nickname,
            headImg:req.session.wechatData.headimgurl,
            gender:req.session.wechatData.gender || req.session.wechatData.sex,
            deviceType:'mp',
            stype :'weixin',
            sType :'weixin',
            userId:req.session.spreadUserId
          },
          method:'POST',
          done:function(data){
            if(data.code === 0){
              delete req.session.spreadUserId;
              useData.setUserInfo(req , res , data , function(){
                res.sendSuccess(req.session);
              });
            }else res.send(data);
          }
        });
      }else{
        res.send(a);
      }
    }
  })

});
exports.router = router;
exports.__path = '/server/qrcode';
