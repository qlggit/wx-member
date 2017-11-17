var express = require('express');
var router = express.Router();
router.post('/send', function(req, res, next) {
   useRequest.send(req , res , {
     url:useUrl.sms.send,
     data:{
       sendType:req.body.sendType || 'BINDING',
       phone:req.body.phone,
       ip:req.remoteAddress,
     },
     method:'POST',
     notBody:1,
     done:function(){
       res.send({
         code:(Math.random()>.5)-0
       })
     }
   })
});
router.post('/check', function(req, res, next) {
   useRequest.send(req , res , {
     url:useUrl.sms.check,
     data:{
       sendType:req.body.sendType || 'BINDING',
       phone:req.body.phone,
       sendCode:req.body.sendCode,
       ip:req.body.ip,
     },
     method:'POST',
     notBody:1,
     done:function(){
       res.send({
         code:(Math.random()>.5)-0
       })
     }
   })
});
exports.router = router;
exports.__path = '/sms';
