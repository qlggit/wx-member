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
      WY.get('/merchant/order/info',{
        orderNo:WY.hrefData.orderNo
      } , function(a){

      })
    },
    searchSeatOrder:function(){
      if(WY.hrefData.seatOrderNo){
        var that = this;
          WY.get('/order/seat/info',{
            seatOrderId:WY.hrefData.seatOrderNo
          },function(a){
            var data = a.data;
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
      var goodsLs = [];
      this.selectedList.forEach(function(a){
        goodsLs.push({
          goodsId:a.id,
          quantity:a.number
        });
      });
      WY.post('/order/pay' , {
        payType:WY.hrefData.payType || 'order',
        supplierId:WY.hrefData.merchantId,
        seatId:WY.hrefData.seatId,
        seatOrderNo:WY.hrefData.seatOrderNo,
        orderNo:WY.hrefData.payType==='seat'?WY.hrefData.seatOrderNo:WY.hrefData.orderNo,
      } , function(a){
        if(a.code == 0){
          vueRouter.push('/merchant/pay-completepayStatus=1');
        }else{
          WY.toast(a.message);
        }
      })
    }
  }
}
