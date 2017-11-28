var express = require('express');
var router = express.Router();

router.get('/banner',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.merchant.banner,
    data:{
      bannerTypeCode:req.query.bannerTypeCode,
      clinetLoc:'WX',
    },
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/data',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.merchant.list,
    data:{
      supplierTypeCode:req.query.supplierTypeCode,
      pageNum:req.query.pageNum || 0,
      pageSize:req.query.pageSize || 10
    },
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;

exports.__path = '/merchant/list';
