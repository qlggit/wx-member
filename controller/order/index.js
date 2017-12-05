var express = require('express');
var router = express.Router();

router.post('/add',function(req, res, next) {
  req.body.seatOrderNo = req.body.seatOrderNo || req.body.orderNo;
  useRequest.send(req , res , {
    url:useUrl.order.add,
    data:req.body,
    method:'POST',
    done:function(data){
      res.useSend(data);
    }
  });
});
router.post('/cancel',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.order.cancel,
    data:req.body,
    method:'POST',
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/info',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.order.info,
    data:{
      orderNo:req.query.orderNo
    },
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/infoBySeat',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.order.infoBySeat,
    data:{
      seatOrderNo:req.query.seatOrderNo
    },
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;

exports.__path = '/order';
