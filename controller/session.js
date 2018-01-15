var express = require('express');
var router = express.Router();
router.get('/get', function(req, res, next) {
  if(req.session.wechatData){
    var wechatData = req.session.wechatData;
    var sendData = {
      openId :wechatData.openid,
      nickname   :wechatData.nickname,
      headImg    :wechatData.headimgurl,
      deviceType:'mp',
      gender :wechatData.gender  || wechatData.sex,
      sType :'weixin',
      uid:req.session.unionid,
    };
    useRequest.send(req , res , {
      url:useUrl.login.login,
      data:sendData,
      method:'POST',
      done:function(data){
        if(data.code === 0){
          useData.setUserInfo(req , res , data , function(){
            sendSession(req.session)
          });
        }
        else sendSession();
      }
    });
  }else sendSession(req.session);
  function sendSession(session){
    res.send({
      hasPing:hasPing,
      session:session||{},
      debug:useConfig.get('debug'),
      apiImgUrl:useConfig.get('apiImgUrl')
    });
  }
});
//是否有拼桌的配置
var hasPing = 1;
router.get('/config/openPing', function(req, res, next) {
  if(req.query.hp = '111222'){
    hasPing = !hasPing;
    res.send((hasPing?'打开':'关闭')+'拼桌成功');
  }
});
exports.router = router;
exports.__path = '/session';
