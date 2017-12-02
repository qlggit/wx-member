var express = require('express');
var router = express.Router();
router.get('/list', useValidate.hasLogin, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.my.order,
    data:req.query,
    done:function(a){
      res.send(a);
    }
  });
});
exports.router = router;

exports.__path = '/my/order';
