var express = require('express');
var router = express.Router();

router.get('/data',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.merchant.search,
    data:{
      lon:0,
      lat:0,
      type:'wine',
      page:0
    },
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;

exports.__path = '/merchant/list';
