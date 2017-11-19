var express = require('express');
var router = express.Router();

router.post('/add',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatOrder.add,
    data:req.body,
    method:'POST',
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/list',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.list,
    data:req.query,
    method:'POST',
    notBody:1,
    done:function(data){
      res.useSend(data);
    }
  });
});
router.post('/again',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatOrder.again,
    data:req.body,
    method:'POST',
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;
exports.__path = '/merchant/seat';
