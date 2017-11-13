var express = require('express');
var router = express.Router();

router.get('/data', function(req, res, next) {
  res.useSend({
    code:0,
    data:{
      wine:(Math.random() * 10 | 0)+1,
      order:(Math.random() * 10 | 0)+1,
      seat:(Math.random() * 10 | 0)+1,
    }
  });
});
exports.router = router;

exports.__path = '/my/count';
