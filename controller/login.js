var express = require('express');
var router = express.Router();
var mongo = useMongo();
var md5 = require('md5');

router.post('/', function(req, res, next) {
  var sendData = {
    uId:req.session.unionid,
  };
  useRequest.send(req , res , {
    url:useUrl.login.infoByUid,
    data:sendData,
    done:function(data){
      if(data.code === 0 && data.data.userId){
        useData.setUserInfo(req , res , data , function(){
          res.sendSuccess(req.session);
        })
      }else res.useSend({
        message:'登录失败'
      });
    }
  });
});
router.post('/info', function(req, res, next) {
  var query = req.body;
  var sendData = {
    openId :query.openid,
    deviceType:'H5',
    sType :'weixin',
    uid:query.unionid,
  };
  useRequest.send(req , res , {
    url:useUrl.login.login,
    data:sendData,
    method:'POST',
    done:function(data){
      if(data.code === 0){
        useData.setUserInfo(req , res , data , function(){
          res.sendSuccess(req.session);
        })
      }else res.useSend({
        message:'登录失败'
      });
    }
  });
});
router.post('/uid', function(req, res, next) {
  var sendData = {
    uId:req.body.uid,
  };
  useRequest.send(req , res , {
    url:useUrl.login.infoByUid,
    data:sendData,
    done:function(data){
      if(data.code === 0 && data.data.userId){
        useData.setUserInfo(req , res , data , function(){
          res.sendSuccess(req.session);
        })
      }else res.useSend({
        message:'登录失败'
      });
    }
  });
});
router.post('/build', function(req, res, next) {
  var userId = req.body.userId || req.session.tokenModel && req.session.tokenModel.userId;
  if(userId)userId = userId.split('_')[0];
  useRequest.send(req , res , {
    url:useUrl.sms.check,
    data:{
      sendType:req.body.sendType || 'BINDING',
      phone:req.body.phone,
      sendCode:req.body.smsCode,
    },
    method:'POST',
    notBody:1,
    done:function(a){
      if(a.code === 0){
        useRequest.send(req , res , {
          url:useUrl.login.build,
          data:{
            phone:req.body.phone,
            userId:userId,
          },
          method:'POST',
          notBody:1,
          done:function(b){
            res.send(b);
          }
        })
      }else{
        res.send(a);
      }
    }
  })
});
exports.router = router;
exports.__path = '/login';
