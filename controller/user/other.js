var express = require('express');
var router = express.Router();
router.get('/info', function(req, res, next) {
  var sendData = {
    userId:req.query.userId,
  };
  useRequest.send(req , res , {
    url:useUrl.login.infoByUserId,
    data:sendData,
    done:function(data){
      res.send(data);
    }
  });
});
exports.router = router;
exports.__path = '/user/other';
