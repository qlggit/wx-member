var express = require('express');
var router = express.Router();
router.get('/merchant/hot', function(req, res, next) {
  res.send({
    code:0,
    list:['SPACE','QUEEN','SPACE','QUEEN','SPACE','QUEEN','SPACE','QUEEN','SPACE','QUEEN']
  })
});
exports.router = router;
exports.__path = '/search';
