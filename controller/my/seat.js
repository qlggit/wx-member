var express = require('express');
var router = express.Router();
router.get('/list', useValidate.hasLogin, function(req, res, next) {
  var data = req.query;
  if(data.startDate)data.startDate = data.startDate + ' 00:00:00';
  if(data.endDate)data.endDate = data.endDate + ' 23:59:59';
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
