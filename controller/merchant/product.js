var express = require('express');
var router = express.Router();

router.get('/list',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.product.list,
    data:{
      pageNum:req.query.pageNum,
      pageSize:10,
      supplierId:req.query.supplierId,
      goodsTypeId:req.query.goodsTypeId,
    },
    method:'POST',
    notBody:1,
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/category',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.product.category,
    data:{
    },
    method:'post',
    notBody:1,
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;

exports.__path = '/merchant/product';
