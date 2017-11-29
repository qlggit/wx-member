export default{
  name:'merchant-pay',
  data() {
    return {
      name:'支付',
      selectedList:'',
      allPrice:'',
      address:'',
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    if(WY.hrefData.payType !== 'seat'){
      this.doSearch();
    }else{
      this.searchSeatOrder();
    }
  },
  methods:{
    doSum:function(){
      this.allPrice = WY.common.sum(this.selectedList,function(a){return (a&&(a.number * a.price) || 0)});
    },
    doSearch:function(){
      var that = this;
      WY.get('/order/info',{
        orderNo:WY.hrefData.orderNo
      } , function(a){
        var data = a.data[0];
        that.selectedList = [
          {
            price:data.lowCostAmount,
            number:1,
            name:'订座：'+data.supplierName+'('+data.seatName+')',
          }
        ];
        that.doSum();
      })
    },
    searchSeatOrder:function(){
      if(WY.hrefData.seatOrderNo){
        var that = this;
        WY.get('/order/seat/myInfo',{
          orderNo:WY.hrefData.seatOrderNo
        },function(a){
          var data = a.data[0];
          that.address = data.seatName;
          if(WY.hrefData.payType === 'seat'){
            that.selectedList = [
              {
                price:data.lowCostAmount,
                number:1,
                name:'订座：'+data.supplierName+'('+data.seatName+')',
              }
            ];
            that.doSum();
          }
        });
      }
    },
    doBuy:function(){
      WY.post('/order/pay' , {
        payType:WY.hrefData.payType || 'order',
        supplierId:WY.hrefData.merchantId,
        seatId:WY.hrefData.seatId,
        seatOrderNo:WY.hrefData.seatOrderNo,
        orderNo:WY.hrefData.payType==='seat'?WY.hrefData.seatOrderNo:WY.hrefData.orderNo,
      } , function(a){
        if(a.code === 0){
          vueRouter.push('/merchant/pay-complete?payStatus=1');
        }else{
          WY.toast(a.message);
        }
      })
    }
  }
}
