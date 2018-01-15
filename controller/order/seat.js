var express = require('express');
var router = express.Router();
router.get('/list',function(req, res, next) {
  var data = req.query;
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
  req.body.reqUserId = req.session.userId ;
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
router.get('/pzList',function(req, res, next) {
  req.query.pageNum = 1;
  req.query.pageSize = 200;
  useRequest.send(req , res , {
    url:useUrl.seatOrder.pzlist,
    data:req.query,
    done:function(data){
      res.useSend(data);
    }
  });
});
router.post('/cancel',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatOrder.cancel,
    data:req.body,
    method:'POST',
    notBody:1,
    done:function(data){
      res.useSend(data);
    }
  });
});

router.get('/statusList',function(req, res, next) {
  var all = [];
  var query = req.query;
  req.query.pageNum = 1;
  req.query.pageSize = 200;
  ['lock','money','book'].forEach(function(a){
    all.push(new Promise(function(rev , rej){
      useRequest.send(req , res , {
        url:useUrl.seatInfo[a+'List'],
        data:query,
        done:function(data){
          rev(data && data.data && data.data.list);
        }
      });
    }))
  });
  Promise.all(all)
    .then(function(values){
    res.sendSuccess(values);
  })
});
exports.router = router;
exports.__path = '/order/seat';
