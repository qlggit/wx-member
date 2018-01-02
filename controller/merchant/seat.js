var express = require('express');
var router = express.Router();
router.get('/list',function(req, res, next) {
  useRequest.send(req , res , {
    url:useUrl.seatInfo.list,
    data:req.query,
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/data',function(req, res, next) {
  var all = [];
  //背景图
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatInfo.backImg,
      tokenInfo:req.headers.tokenInfo,
      data:req.query,
      done:function(a){
        rev(a.data);
      }
    });
  }));
  //座位列表
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatInfo.list,
      tokenInfo:req.headers.tokenInfo,
      data:req.query,
      done:function(a){
        rev(a.data);
      }
    });
  }));
  Promise.all(all).then(function(v){
    res.send({
      data:v
    })
  })
});
router.get('/statusData',function(req, res, next) {
  var all = [];
  //座位订单
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatOrder.list,
      data:{
        supplierId:req.query.supplierId,
        startDate:req.query.startDate,
        endDate:req.query.endDate,
        pageNum:1,
        pageSize:200,
      },
      done:function(a){
        rev(a && a.data && a.data.list);
      }
    });
  }));
  ['lock','money','book'].forEach(function(a){
    all.push(new Promise(function(rev , rej){
      useRequest.send(req , res , {
        url:useUrl.seatInfo[a+'List'],
        data:{
          supplierId:req.query.supplierId,
          startDate:req.query.startDate,
          endDate:req.query.endDate,
          pageNum:1,
          pageSize:200,
        },
        done:function(data){
          rev(data && data.data && (data.data.list || data.data));
        }
      });
    }))
  });
  //拼桌列表
  all.push(new Promise(function(rev , rej){
    useRequest.send(req , res , {
      url:useUrl.seatOrder.pzlist,
      data:{
        supplierId:req.query.supplierId,
        startDate:req.query.startDate,
        endDate:req.query.endDate,
        pageNum:1,
        pageSize:200,
      },
      done:function(a){
        rev(a && a.data && a.data.list);
      }
    });
  }));
  Promise.all(all).then(function(v){
    res.send({
      data:v
    })
  })
});
exports.router = router;
exports.__path = '/merchant/seat';
