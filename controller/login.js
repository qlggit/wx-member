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
        if(data.code == 0){
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
exports.router = router;
exports.__path = '/login';
