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
          a.noPay = a.payStatus !== 'ALREADY_PAY';
          a.hasMe = a.noPay || a.payStatus === 'ALREADY_PAY' || a.pzStatus === 'pzStatus';
          if(a.payStatus === 'ALREADY_PAY'){
            a.statusName = '已支付'
          }else{
            a.statusName = '未支付';
          }
        });
          that.orderList = a.data.list;
      });
    },
    cancelSeat:function(id){
      //取消订座
    }
  }
}
