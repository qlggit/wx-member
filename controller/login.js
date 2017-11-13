var express = require('express');
var router = express.Router();
var mongo = useMongo();
var md5 = require('md5');

router.post('/', useValidate.hasLogin, function(req, res, next) {
    res.send({
      code:1
    });
});
exports.router = router;
exports.__path = '/login';
