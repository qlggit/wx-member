var express = require('express');
var router = express.Router();
router.get('/data',  function(req, res, next) {
  useData.getAreaData(req , res , function(a){
    res.sendSuccess(a);
  })
});
router.get('/data/flush',  function(req, res, next) {
  useData.getAreaData(req , res , function(a){
    res.sendSuccess(a);
  })
});
exports.router = router;
exports.__path = '/city';
