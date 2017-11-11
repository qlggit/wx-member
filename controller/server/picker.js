var express = require('express');
var router = express.Router();
router.get('/merchant/list', function(req, res, next) {
  res.send({
    data:[
      {
        id:1,
        name:'K酒吧',
      },
      {
        id:2,
        name:'S酒吧',
      }
    ]
  })
});
exports.router = router;

exports.__path = '/server/picker';
