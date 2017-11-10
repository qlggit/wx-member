var express = require('express');
var router = express.Router();

router.get('/list',function(req, res, next) {
  var data = [{
    id:1,
    name:'Walker',
    img:'/images/demo.png',
    price:99,
    remark:'这是备注这是备注'
  },
    {
      id:2,
      name:'Walker',
      img:'/images/demo.png',
      price:99,
      remark:'这是备注这是备注'
    },{
      id:3,
      name:'Walker',
      img:'/images/demo.png',
      price:99,
      remark:'这是备注这是备注'
    },
    {
      id:4,
      name:'Walker',
      img:'/images/demo.png',
      price:99,
      remark:'这是备注这是备注'
    }
  ];
  return res.useSend({
    data:data
  });
  useRequest.send(req , res , {
    url:useUrl.merchant.search,
    data:{
      lon:0,
      lat:0,
      type:'wine',
      page:0
    },
    done:function(data){
      res.useSend(data);
    }
  });
});
router.get('/category',function(req, res, next) {
  return res.useSend({
    data:[{
      name:'white wine',
      code:1
    },
      {
        name:'white wine',
        code:1
      },
      {
        name:'white wine',
        code:1
      },
      {
        name:'white wine',
        code:1
      },
      ]
  });
  useRequest.send(req , res , {
    url:useUrl.merchant.search,
    data:{
      lon:0,
      lat:0,
      type:'wine',
      page:0
    },
    done:function(data){
      res.useSend(data);
    }
  });
});
exports.router = router;

exports.__path = '/merchant/product';
