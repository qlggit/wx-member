var express = require('express');
var router = express.Router();

router.get('/list',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.merchant.fileList,
    data:{
      supplierFileType:req.query.supplierFileType
    },
    done:function(a){
      res.useSend(a);
    }
  })
});

router.get('/listAll',function(req, res, next) {
  var all = [];
  var types = ['banner','activity','environment'];
  var supplierId = req.query.supplierId;
  types.forEach(function(type){
    all.push(new Promise(function(rev , rej){
      useRequest.send(req , res , {
        url:useUrl.merchant.fileList,
        data:{
          supplierFileType:type,
          pageNum:0,
          pageSize:100,
          supplierId:supplierId
        },
        done:function(a){
          rev(a.data.list);
        }
      })
    }))
  });
  Promise.all(all).then(function(values){
    res.send({
      data:values
    })
  })
});
router.get('/info',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.merchant.detail,
    data:{
      supplierId:req.query.supplierId
    },
    done:function(a){
      res.useSend(a);
    }
  })
});
exports.router = router;

exports.__path = '/merchant/detail';
