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
        that.orderList = a.data.list.filter(function(a){
          if(a.status === 'cancel')return false;
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
          a.orderTypeName = WY.session.isOwner(a.userId)?'订座':'拼桌';
          a.noPay = a.payStatus !== 'ALREADY_PAY';
          if(a.payStatus === 'ALREADY_PAY'){
            a.statusName = '已支付'
          }else{
            a.statusName = '未支付';
          }
          a.hasMe = a.noPay || a.payStatus === 'ALREADY_PAY' || a.pzStatus === 'pzStatus';
          a.hasDeductibleAmount = !a.noPay &&  WY.session.isOwner(a.userId) && a.deductibleAmount > 0;
          if(a.noPay){
            a.diffTime = new Date(a.expireTime) - Date.now();
            if(a.diffTime < 0){
              a.statusName = '已过期';
            }
          }
          return true;
        });
      });
    },
    cancelSeat:function(orderNo){
      //取消订座
      var that = this;
      WY.confirm({
        content:'确定取消当前订桌？',
        done:function(v){
          if(v)WY.post('/order/seat/cancel' , {
            orderNo:orderNo,
          } , function(a){
            if(a.code === 0){
              that.doSearch();
            }else{
              WY.toast(a.message);
            }
          });
        }
      })
    }
  }
}
