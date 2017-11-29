export default{
  name:'my-order',
  data() {
    return {
      orderList:[
        {
          placeName:'A酒吧',
          status:'B',
          statusName:'已上菜',
          amount:Math.ceil(20000 * Math.random()),
          diffTime:Math.ceil(20000 * Math.random()) * 1000,
          wineList:[
            {
              name:'A酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random()),
              number:Math.ceil(10 * Math.random())
            }
          ]
        },
        {
          placeName:'A酒吧',
          status:'B',
          statusName:'已上菜',
          amount:Math.ceil(20000 * Math.random()),
          wineList:[
            {
              name:'A酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random()),
              number:Math.ceil(10 * Math.random())
            },
            {
              name:'B酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random()),
              number:Math.ceil(10 * Math.random())
            }
          ]
        },
        {
          placeName:'A酒吧',
          status:'B',
          statusName:'已上菜',
          amount:Math.ceil(20000 * Math.random()),
          wineList:[
            {
              name:'A酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random()),
              number:Math.ceil(10 * Math.random())
            },
            {
              name:'B酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random()),
              number:Math.ceil(10 * Math.random())
            },
            {
              name:'C酒',
              img:'/images/demo.png',
              remark:'备注备注',
              price:Math.ceil(10000 * Math.random()),
              number:Math.ceil(10 * Math.random())
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
      that.doSearch();
    } , this);
  },
  methods:{
    doSearch:function(){
      var that = this;
      WY.get('/my/order/list' , {
        pageNum:1,
        pageSize:100,
        startDate:WY.common.parseDate(new Date , 'Y-m-d'),
      } , function(a){
        that.orderList = a.data.list;
      });
    },
    showMoreWine:function(index){
      this.orderList[index].showMore = false;
      this.orderList[index].wineList = this.orderList[index].autoList;
    },
    cancelOrder:function(id){

    }
  }
}
