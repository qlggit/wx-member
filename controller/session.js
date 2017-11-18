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
        if(data.code == 0){
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
      session:req.session,
      debug:useConfig.get('debug'),
      apiImgUrl:useConfig.get('apiImgUrl')
    });
  }
});
router.post('/post', function(req, res, next) {
  res.send({
    headers:req.headers,
    body:req.body,
    query:req.query,
    session:req.session,
    apiImgUrl:useConfig.get('apiImgUrl')
  })
});
exports.router = router;
exports.__path = '/session';
