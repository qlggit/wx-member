var express = require('express');
var router = express.Router();

router.get('/data',function(req, res, next) {
  res.useSend({
    code:0,
    data:{
      name:'club queen',
      headerBanner:[{img:'/images/demo.png'},{img:'/images/demo.png'},{img:'/images/demo.png'}],
      lvl:3.5,
      latitude:0,
      longitude:0,
      address:'地理位置地理位置',
      remark:'这就是商家简介这就是商家简介这就是商家简介这就是商家简介这就是商家简介这就是商家简介',
      activity:[
        {
          name:'活动名',
          img:'/images/demo.png',
          url:'',
          type:''
        },{
          name:'活动名',
          img:'/images/demo.png',
          url:'',
          type:''
        },{
          name:'活动名',
          img:'/images/demo.png',
          url:'',
          type:''
        }
      ],
      showInfo:[
        {
          img:'/images/demo.png',
          url:'',
          type:''
        },{
          img:'/images/demo.png',
          url:'',
          type:''
        },{
          img:'/images/demo.png',
          url:'',
          type:''
        }
      ],

    }
  });
});
exports.router = router;

exports.__path = '/merchant/detail';
