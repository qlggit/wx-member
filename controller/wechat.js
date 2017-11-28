var express = require('express');
var router = express.Router();
router.get('/entrance', function(req, res, next) {
    req.session.openId = req.query.openid;
    req.session.unionid = req.query.unionid || req.query.openid;
    var query = req.query;
    /*
    * unionid:req.session.unionid,
    * sex   :query.sex,
    * province   :query.province,
    * city   :query.city,
    * country   :query.country,
    * */
  useSession.save(req , res , function(){
        var sendData = {
          openId :query.openid,
          nickname   :query.nickname,
          headImg    :query.headimgurl,
          deviceType:'H5',
          sType:'weixin',
          uid:req.session.unionid,
        };
        useRequest.send(req , res , {
          url:useUrl.login.login,
          data:sendData,
          method:'POST',
          done:function(data){
            if(data.code == 0){
              useData.setUserInfo(req , res , data , function(){
                res.useRedirect(req.session.callback || '/');
              })
            }else res.useSend('授权登录失败');
          }
        });
  });
});
router.get('/login', function(req, res, next) {
    if(req.session.userInfo && req.session.userInfo.userId){
        return res.useRedirect('/' );
    }
    res.redirect(useConfig.get('wechatLoginUrl'));
});
router.post('/jssdk', function(req, res, next) {
  useRequest.send(req , res , {
    url:useConfig.get('wechatJssdkUrl'),
    data:req.body,
    method:'POST',
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;
exports.__path = '/wechat';
