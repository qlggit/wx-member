var express = require('express');
var router = express.Router();
router.get('/list',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.list,
    data:req.query,
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/data',function(req, res, next) {
  var all = [];
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatInfo.backImg,
      tokenInfo:req.headers.tokenInfo,
      data:{
        supplierId:req.query.supplierId
      },
      done:function(a){
        rev(a.data);
      }
    });
  }));
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatInfo.list,
      tokenInfo:req.headers.tokenInfo,
      data:{
        supplierId:req.query.supplierId
      },
      done:function(a){
        rev(a.data);
      }
    });
  }));
  Promise.all(all).then(function(v){
    res.send({
      data:v
    })
  })
});
exports.router = router;
exports.__path = '/merchant/seat';
