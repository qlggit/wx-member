var express = require('express');
var router = express.Router();
router.get('/entrance', function(req, res, next) {
    req.session.openId = req.session.openid  = req.query.openid;
    req.session.unionid = req.query.unionid || req.query.openid;
    var query = req.query;
    req.session.wechatData = req.query;
    useSession.save(req , res , function(){
         if(req.session.spreadUserId){
           return res.useRedirect(req.session.callback || '/');
         }
          var sendData = {
            openId :query.openid,
            nickname   :query.nickname,
            headImg    :query.headimgurl,
            deviceType:'mp',
            gender :query.gender  || query.sex,
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
                  res.useRedirect(req.session.callback || '/');
                })
              }else res.useSend('授权登录失败');
            }
          });
    });
});
router.get('/entrance/new', function(req, res, next) {
    req.session.openId = req.query.openid;
    req.session.unionid = req.query.unionid || req.query.openid;
    var query = req.query;
    req.session.wechatData = req.query;
    useSession.save(req , res , function(){
         if(req.session.spreadUserId){
           return res.useRedirect(req.session.callback || '/');
         }
          var sendData = {
            openId :query.openid,
            nickname   :query.nickname,
            headImg    :query.headimgurl,
            deviceType:'mp',
            gender :query.gender  || query.sex,
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
                  res.useRedirect(req.session.callback || '/');
                })
              }else res.useSend('授权登录失败');
            }
          });
    });
});
router.get('/login', function(req, res, next) {
   req.session.callback = req.headers.referer || req.session.callback;
  useSession.save(req , res , function(){
    if(req.session.userInfo && req.session.userInfo.userId){
      return res.useRedirect('/');
    }
    var wechatLoginUrl = useConfig.get('wechatLoginUrl');
    var remoteAddress = req.remoteAddress;
    if(remoteAddress.indexOf('192') > -1){
      wechatLoginUrl += '&host=' + useConfig.get('hostname');
    }
    console.log(wechatLoginUrl);
    res.redirect(wechatLoginUrl);
  });

});
router.get('/login/h5', function(req, res, next) {
   req.session.callback = req.headers.referer || req.session.callback;
  useSession.save(req , res , function(){
    if(req.session.userInfo && req.session.userInfo.userId){
      return res.useRedirect('/');
    }
    var wechatLoginUrl = useConfig.get('wechatLoginUrl');
    var remoteAddress = req.remoteAddress;
    if(remoteAddress.indexOf('192') > -1){
      wechatLoginUrl += '&host=' + useConfig.get('hostname');
    }
    console.log(wechatLoginUrl);
    res.redirect(wechatLoginUrl);
  });

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
router.get('/download', function(req, res, next) {
  res.send('下载页面')
});
exports.router = router;
exports.__path = '/wechat';
