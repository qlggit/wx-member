export default{
  name:'my-order',
  data() {
    return {
      orderList:[
        {
          placeName:'A酒吧',
          status:'B',
          statusName:'已上菜',
          amount:Math.ceil(20000 * Math.random() | 0),
          wineList:[
            {
              name:'A酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random() | 0),
              number:Math.ceil(10 * Math.random() | 0)
            },
            {
              name:'B酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random() | 0),
              number:Math.ceil(10 * Math.random() | 0)
            },
            {
              name:'C酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random() | 0),
              number:Math.ceil(10 * Math.random() | 0)
            }
          ]
        },
        {
          placeName:'A酒吧',
          status:'B',
          statusName:'已上菜',
          amount:Math.ceil(20000 * Math.random() | 0),
          wineList:[
            {
              name:'A酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random() | 0),
              number:Math.ceil(10 * Math.random() | 0)
            },
            {
              name:'B酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random() | 0),
              number:Math.ceil(10 * Math.random() | 0)
            },
            {
              name:'C酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random() | 0),
              number:Math.ceil(10 * Math.random() | 0)
            }
          ]
        },
        {
          placeName:'A酒吧',
          status:'B',
          statusName:'已上菜',
          amount:Math.ceil(20000 * Math.random() | 0),
          wineList:[
            {
              name:'A酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random() | 0),
              number:Math.ceil(10 * Math.random() | 0)
            },
            {
              name:'B酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random() | 0),
              number:Math.ceil(10 * Math.random() | 0)
            },
            {
              name:'C酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random() | 0),
              number:Math.ceil(10 * Math.random() | 0)
            }
          ]
        }
      ],
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    WY.oneReady('user-info',function(o){
      that.userInfo = o;
    } , this);
  },
  methods:{
    doSearch:function(){
    },
  }
}
