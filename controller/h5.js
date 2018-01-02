var express = require('express');
var router = express.Router();
router.get('/h5/*', function(req, res, next) {
    res.useRender('index',{
      a:1,
    });
});
exports.router = router;
exports.__path = '/';
