var express = require('express');
var router = express.Router();
//暂时是商户管理平台
router.get('/',useValidate.threeLogin, function(req, res, next) {
  res.useRender('index');
});
exports.router = router;
exports.__path = '/server/app/book';
