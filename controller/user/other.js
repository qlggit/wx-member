var express = require('express');
var router = express.Router();

router.get('/info', function(req, res, next) {
  res.send({
    data:req.session.userInfo
  });
});
exports.router = router;
exports.__path = '/user/other';
