var express = require('express');
var router = express.Router();

router.get('/data', function(req, res, next) {
  var all = [];
  all.push(new Promise(function(rev){
    useRequest.send(req , res , {
      url:useUrl.my.seat,
      data:{
        pageNum:1,
        pageSize:100,
        startDate:useCommon.getStartBookTime(),
      },
      done:function(a){
        if(a.code === 0){
          rev(a.data.total);
        }else{
          rev(0);
        }
      }
    });
  }));
  all.push(new Promise(function(rev){
    useRequest.send(req , res , {
      url:useUrl.my.order,
      data:{
        pageNum:1,
        pageSize:100,
        startDate:useCommon.getStartBookTime(),
      },
      done:function(a){
        if(a.code === 0){
          rev(a.data.total);
        }else{
          rev(0);
        }
      }
    });
  }));
  Promise.all(all).then(function(v){
    res.useSend({
      code:0,
      data:{
        wine:(Math.random() * 10 | 0)+1,
        order:v[1],
        seat:v[0],
      }
    });
  });
});
exports.router = router;

exports.__path = '/my/count';
