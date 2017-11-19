export default{
  name:'merchant-pay',
  data() {
    return {
      name:'支付',
      selectedList:'',
      allPrice:''
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    this.selectedList = WY.getLocalStorage('selectedList');
    this.allPrice = WY.common.sum(this.selectedList,function(a){return (a&&(a.number * a.price) || 0)});
  },
  methods:{
    doSearch:function(){
      WY.get('/merchant/order/info',{
        orderNo:WY.hrefData.orderNo
      } , function(a){

      })
    },
    doBuy:function(){
      var goodsLs = [];
      this.selectedList.forEach(function(a){
        goodsLs.push({
          goodsId:a.id,
          quantity:a.number
        });
      });
      WY.post('/merchant/order/add' , {
        seatId:'',
        goodsLs:goodsLs,
        supplierId:WY.getLocalStorage('merchantId')
      } , function(a){
        if(a.code == 0){
          vueRouter.push('/merchant/pay?orderNo='+a.result );
        }else{
          WY.toast(a.message);
        }
      })
    }
  }
}
