var express = require('express');
var router = express.Router();
router.get('/list',useValidate.threeLogin, function(req, res, next) {
  res.useRender('index');
});
router.get('/detail',useValidate.threeLogin, function(req, res, next) {
  res.useRender('index');
});
router.get('/data', function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.message[req.query.type],
    data:{
      pageNum:req.query.pageNum,
      pageSize:req.query.pageSize,
      status:req.query.status,
    },
    done:function(a){
      res.useSend(a);
    }
  })
});
exports.router = router;
exports.__path = '/server/app/message';
