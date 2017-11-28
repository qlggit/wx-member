var express = require('express');
var router = express.Router();
//暂时是运营支撑平台
router.get('/create',useValidate.threeLogin, function(req, res, next) {
    res.useRender('index');
});
router.post('/add',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.add,
    method:'POST',
    tokenInfo:req.headers.tokenInfo,
    data:req.body.jsonStr,
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
router.post('/fileAdd',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.addBack,
    method:'POST',
    tokenInfo:req.headers.tokenInfo,
    data:req.body,
    notBody:1,
    done:function(a){
        res.send(a);
    }
  });
});
exports.router = router;

exports.__path = '/server/admin/seat';
