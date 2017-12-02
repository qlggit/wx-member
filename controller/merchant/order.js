var express = require('express');
var router = express.Router();

router.post('/add',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.order.add,
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
router.get('/seat/list',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatOrder.list,
    data:req.query,
    method:'POST',
    notBody:1,
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;

exports.__path = '/merchant/order';
