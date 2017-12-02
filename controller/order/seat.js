var express = require('express');
var router = express.Router();
router.get('/list',function(req, res, next) {
  var data = req.query;
  if(data.startDate)data.startDate = data.startDate + ' 00:00:00';
  if(data.endDate)data.endDate = data.endDate + ' 23:59:59';
  useRequest.send(req , res , {
    url:useUrl.seatOrder.list,
    data:data,
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/info',function(req, res, next) {
  var data = req.query;
  useRequest.send(req , res , {
    url:useUrl.seatOrder.info,
    data:data,
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/myInfo',function(req, res, next) {
  var data = req.query;
  useRequest.send(req , res , {
    url:useUrl.seatOrder.myInfo,
    data:data,
    done:function(data){
      res.useSend(data);
    }
  });
});
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
router.post('/pz',function(req, res, next) {
  req.body.reqUserId = req.session.userInfo.userId;
  useRequest.send(req , res , {
    url:useUrl.seatOrder.pz,
    data:req.body,
    method:'POST',
    notBody:1,
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;

exports.__path = '/order/seat';
