var express = require('express');
var router = express.Router();
//暂时是商户管理平台
router.get('/index',useValidate.threeLogin, function(req, res, next) {
    res.useRender('index');
});
router.get('/lock/list',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.lockList,
    tokenInfo:req.headers.tokenInfo,
    data:req.query,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.get('/money/list',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.moneyList,
    tokenInfo:req.headers.tokenInfo,
    data:req.query,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.post('/lock',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.lock,
    method:'POST',
    tokenInfo:req.headers.tokenInfo,
    data:req.body,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.post('/edit',useValidate.threeLogin.check, function(req, res, next) {
  req.body.seatId = req.body.seatId || req.body.yukeSupplierSeatId;
  useRequest.send(req , res , {
    url:useUrl.seatInfo.edit,
    method:'POST',
    tokenInfo:req.headers.tokenInfo,
    data:req.body,
    notBody:1,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.post('/money',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.money,
    method:'POST',
    tokenInfo:req.headers.tokenInfo,
    data:req.body,
    done:function(a){
      res.useSend(a);
    }
  });
});
exports.router = router;
exports.__path = '/server/merchant/seat';
