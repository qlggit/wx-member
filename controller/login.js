var express = require('express');
var router = express.Router();
var mongo = useMongo();
var md5 = require('md5');

router.post('/', function(req, res, next) {
    useRequest.send(req , res , {
      url:useUrl.login.info,
      data:{
        userId:req.body.userId,
      },
      done:function(data){
        if(data.code === 0){
          useData.setUserInfo(req , res , data , function(){
            res.useSend({
              code:data.code,
              data:req.session
            });
          });
        }
        else res.useSend(data);
      }
    });
});
router.post('/build', function(req, res, next) {
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
      if(1 || a.code == 0){
        useRequest.send(req , res , {
          url:useUrl.login.build,
          data:{
            phone:req.body.phone,
            userId:req.session.userInfo.userId,
          },
          method:'POST',
          notBody:1,
          done:function(b){
            res.send({
              code:b.code&&((Math.random()>.5)-0),
              message:b.message
            });
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
