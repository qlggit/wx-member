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
    WY.autoVueObj = this;
    var that = this;
    WY.loading(1);
    WY.oneReady('user-info',function(o){
      that.userInfo = o;
      that.doSearch();
    } , this);
  },
  methods:{
    doSearch:function(){
      var that = this;
      WY.loading(1);
      WY.get('/my/order/list' , {
        pageNum:1,
        pageSize:100,
        startDate:WY.common.getStartBookTime(),
      } , function(a){
        WY.loading(0);
        that.orderList = a.data.list.filter(function(a){
          if(a.status === 'cancel')return false;
          a.wineList = a.detailLs;
          a.placeName = a.supplierName;
          a.statusName = a.payStatus === 'ALREADY_PAY'?'已支付':'未支付';
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
          return true;
        });
      });
    },
    showMoreWine:function(index){
      this.orderList[index].showMore = false;
      this.orderList[index].wineList = this.orderList[index].autoList;
    },
    cancelOrder:function(orderNo){
      var that = this;
      WY.confirm({
        content:'确定取消当前订单？',
        done:function(v){
          if(v){
            WY.post('/order/cancel' , {
              orderNo:orderNo,
            } , function(a){
              if(a.code === 0){
                that.doSearch();
              }else{
                WY.toast(a.message);
              }
            });
          }
        }
      })
    }
  }
}
