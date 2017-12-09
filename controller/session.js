var express = require('express');
var router = express.Router();
router.get('/get', function(req, res, next) {
  if(req.session.userInfo && !req.session.userInfo.userName){
    useRequest.send(req , res , {
      url:useUrl.login.info,
      data:{
        userId:req.session.userInfo.userId,
      },
      done:function(data){
        if(data.code === 0){
          useData.setUserInfo(req , res , data , function(){
            sendSession()
          });
        }
        else sendSession();
      }
    });
  }else sendSession();
  function sendSession(){
    res.send({
      hasPing:hasPing,
      session:req.session,
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
