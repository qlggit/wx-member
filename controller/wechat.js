var express = require('express');
var router = express.Router();
router.get('/entrance', function(req, res, next) {
    req.session.openId = req.query.openid;
    req.session.unionid = req.query.unionid || req.query.openid;
    var query = req.query;
    var sendData = {
        unionid:req.session.unionid,
        openId :query.openid,
        nickName  :query.nickname,
        avatarUrl   :query.headimgurl,
        gender   :query.sex,
        province   :query.province,
        city   :query.city,
        country   :query.country,
        loginSource:'wxh5',
    };
    useRequest.send(req , res , {
      url:useUrl.login.reg,
      data:sendData,
      method:'POST',
      done:function(data){
          req.session.userInfo = sendData;
          return res.useRedirect(req.session.callback || '/');;
         if(data.code == 0){
           req.session.apiSessionId = data.data.jsessionid;
           req.session.userInfo = data.data;
           useSession.save(req , res , function(){
             res.useRedirect(req.session.callback || '/');
           });
         }else res.useSend('授权登录失败');
      }
    });
});
router.get('/login', function(req, res, next) {
    if(req.session.userInfo){
        return res.useRedirect('/' );
    }
    res.redirect(useConfig.get('wechatLoginUrl'));
    //res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa1cab69ff4cc686b&redirect_uri=http://api.yqsapp.com/yqsapi/api/app/wx/aouth/abc/YQS&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect');
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
