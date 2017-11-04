var express = require('express');
var router = express.Router();
router.get('/get', function(req, res, next) {
  res.send({
    session:req.session,
    debug:useConfig.get('debug'),
    apiImgUrl:useConfig.get('apiImgUrl')
  })
});
router.post('/post', function(req, res, next) {
  res.send({
    headers:req.headers,
    body:req.body,
    query:req.query,
    session:req.session,
    apiImgUrl:useConfig.get('apiImgUrl')
  })
});
exports.router = router;
exports.__path = '/session';
