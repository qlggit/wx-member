var express = require('express');
var router = express.Router();
router.get('/list', useValidate.hasLogin, function(req, res, next) {
  var data = req.query;
  useRequest.send(req , res , {
    url:useUrl.my.seat,
    data:data,
    done:function(a){
      res.send(a);
    }
  });
});
exports.router = router;

exports.__path = '/my/seat';
