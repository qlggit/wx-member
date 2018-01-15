var express = require('express');
var router = express.Router();
router.get('/name', function (req, res, next) {
});
router.get('/token', function (req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.user.rongToken,
    data:req.query,
    done:function(a){
      return res.useSend(a);
    }
  })
});
router.get('/rong', function (req, res, next) {
  res.render('rong');
});
exports.router = router;
exports.__path = '/test';
