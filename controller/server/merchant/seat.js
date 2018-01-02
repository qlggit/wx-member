var express = require('express');
var router = express.Router();
//暂时是商户管理平台
router.get('/index',useValidate.threeLogin, function(req, res, next) {
    res.useRender('index');
});
router.post('/lockCancel',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.lockCancel,
    method:'POST',
    data:req.body,
    notBody:1,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.post('/moneyCancel',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.moneyCancel,
    data:req.body,
    method:'POST',
    notBody:1,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.post('/bookCancel',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.moneyCancel,
    method:'POST',
    data:req.body,
    notBody:1,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.get('/lock/list',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.lockList,
    data:req.query,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.get('/book/list',useValidate.threeLogin.check, function(req, res, next) {
  req.query.pageNum = 1;
  req.query.pageSize = 100;
  var all = [];
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatOrder.info,
      data:req.query,
      done:function(a){
        if(a.code === 0){
          rev(a.data.list || a.data);
        }else rej();
      }
    });
  }));
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatInfo.bookList,
      data:req.query,
      done:function(a){
        if(a.code === 0){
          rev(a.data.list || a.data);
        }else rej();
      }
    });
  }));
  Promise.all(all).then(function(v){
    v[0] && v[0].forEach(function(a){
      a.online = 1;
    });
    res.sendSuccess(v[0].concat(v[1]));
  }).catch(function(){
    res.useSend({});
  });
});
router.get('/money/list',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.moneyList,
    data:req.query,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.post('/book',useValidate.threeLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.book,
    method:'POST',
    data:req.body,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.post('/lock',useValidate.threeLogin.check, function(req, res, next) {
  req.body.lockType = 'part';
  useRequest.send(req , res , {
    url:useUrl.seatInfo.lock,
    method:'POST',
    data:req.body,
    notBody:1,
    done:function(a){
      res.useSend(a);
    }
  });
});

router.post('/money',useValidate.threeLogin.check, function(req, res, next) {
  req.body.setType = 'part';
  useRequest.send(req , res , {
    url:useUrl.seatInfo.money,
    method:'POST',
    data:req.body,
    notBody:1,
    done:function(a){
      res.useSend(a);
    }
  });
});
router.post('/edit',useValidate.threeLogin.check, function(req, res, next) {
  var seatId = req.body.seatId || req.body.yukeSupplierSeatId;
  var all = [];
  seatId.split(',').forEach(function(a){
    all.push(new Promise(function(rev , rej){
      var data = req.body;
      data.seatId = a;
      useRequest.send(req , res , {
        url:useUrl.seatInfo.edit,
        method:'POST',
        data:data,
        notBody:1,
        done:function(a){
          if(a.code === 0)rev();
          else rej(a);
        }
      });
    }));
  });
  Promise.all(all).then(function(){
    res.sendSuccess({});
  }).catch(function(a){
    res.useSend(a);
  });
});
exports.router = router;
exports.__path = '/server/merchant/seat';
