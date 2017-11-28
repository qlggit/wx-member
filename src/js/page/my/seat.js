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
      WY.get('/my/seat/list' , {
        pageNum:1,
        pageSize:100,
        startDate:WY.common.parseDate(new Date , 'Y-m-d'),
      } , function(a){
        a.data.list.forEach(function(a){
          a.payUrl = WY.common.addUrlParam('/merchant/pay',{
            payType:'seat',
            seatOrderNo:a.orderNo,
            supplierId:a.supplierId,
            seatId:a.seatId,
          });
          a.productUrl = WY.common.addUrlParam('/merchant/product',{
            seatOrderNo:a.orderNo,
            supplierId:a.supplierId,
            seatId:a.seatId,
          });
          a.noPay = a.orderType === 'normal' && a.payStatus === 'NOT_PAY';
          a.hasMe = a.noPay || a.payStatus === 'ALREADY_PAY' || a.pzStatus === 'y';
          a.statusName = a.orderType === 'normal'?(a.payStatus !== 'ALREADY_PAY'?'未支付':'已支付'):(
            ({
              y:'已同意',
              n:'已拒绝'
            })[a.pzStatus]||'处理中'
          )
        });
          that.orderList = a.data.list;
      });
    },
  }
}
