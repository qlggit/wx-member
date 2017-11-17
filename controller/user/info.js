var express = require('express');
var router = express.Router();
router.post('/edit', useValidate.hasLogin, function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.user.edit,
    data:{
      gender:req.body.gender,
      age:req.body.age,
      address:req.body.address,
    },
    method:'POST',
    done:function(a){
      res.send(a);
    }
  });
});
exports.router = router;

exports.__path = '/user/info';
