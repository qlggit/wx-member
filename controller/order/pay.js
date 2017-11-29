var express = require('express');
var router = express.Router();
router.post('/',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.pay.do,
    data:req.body,
    method:'POST',
    notBody:1,
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;

exports.__path = '/order/pay';
