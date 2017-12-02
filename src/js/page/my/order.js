export default{
  name:'my-order',
  data() {
    return {
      orderList:'',
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
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
        pageSize:10,
      } , function(a){
        a.data.list.forEach(function(a){
          //diffTime
          a.wineList = a.detailLs;
          a.placeName = a.supplierName;
          a.statusName = a.payStatus;
          a.amount = a.orderMoney;
          a.wineList.forEach(function(a){
            a.name = a.goodsName;
            a.number = a.quantity;
            a.price = a.unitPrice;
          });
          a.wineLength = a.wineList.length;
          a.miniWineList = a.wineList.slice(0,2);
          a.autoList = a.wineList;
          a.wineList = a.wineList.slice(0,2);
          if(a.wineLength > 2){
            a.showMore = true;
          }
        });
        that.orderList = a.data.list;
      });
    },
    showMoreWine:function(index){
      this.orderList[index].showMore = false;
      this.orderList[index].wineList = this.orderList[index].autoList;
    },
    cancelOrder:function(orderNo){

    }
  }
}
