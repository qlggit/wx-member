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
    this.orderList.forEach(function(a){
        a.wineLength = a.wineList.length;
        a.miniWineList = a.wineList.slice(0,2);
        a.autoList = a.wineList;
        a.wineList = a.wineList.slice(0,2);
        if(a.wineLength > 2){
          a.showMore = true;
        }
    });
    WY.oneReady('user-info',function(o){
      that.userInfo = o;
    } , this);
  },
  methods:{
    doSearch:function(){
    },
    showMoreWine:function(index){
      this.orderList[index].showMore = false;
      this.orderList[index].wineList = this.orderList[index].autoList;
    }
  }
}
