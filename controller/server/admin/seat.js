var express = require('express');
var router = express.Router();
//暂时是运营支撑平台
router.get('/create',useValidate.adminLogin, function(req, res, next) {
    res.useRender('index');
});
router.post('/add',useValidate.adminLogin.check, function(req, res, next) {
  console.log(req.body.jsonStr);
  console.log(typeof  req.body.jsonStr);
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
router.post('/fileAdd',useValidate.adminLogin.check, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.addBack,
    method:'POST',
    tokenInfo:req.headers.tokenInfo,
    data:JSON.parse(req.body.jsonStr || '[]'),
    done:function(){
        res.send({
          code:0
        });
    }
  });
});
router.get('/search',useValidate.adminLogin.check, function(req, res, next) {
  var all = [];
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatInfo.backImg,
      method:'POST',
      tokenInfo:req.headers.tokenInfo,
      data:{
        supplierId:req.query.supplierId
      },
      done:function(a){
        rev(a.data);
      }
    });
  }))
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatInfo.list,
      method:'POST',
      tokenInfo:req.headers.tokenInfo,
      data:{
        supplierId:req.query.supplierId
      },
      done:function(a){
        rev(a.data);
      }
    });
  }))
  Promise.all(all).then(function(v){
    res.send({
      data:v
    })
  })
});
exports.router = router;

exports.__path = '/server/admin/seat';
