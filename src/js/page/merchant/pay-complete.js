export default{
  name:'merchant-pay-complete',
  data() {
    return {
      name:'',
      payStatus:'',
      payImg:'',
      backUrl:'',
      isServer:0,
    }
  },
  beforeDestroy:function(){
  },
  created:function(){
    this.isServer = location.href.indexOf('server') > 0;
    this.basePath = location.href.indexOf('server') > 0 ? '/server/app' : '/merchant';
    this.backUrl = WY.session.getBackUrl() || '/';
    this.payStatus = (WY.hrefData.payStatus || Math.round(Math.random())) - 0 === 1;
    this.payImg = '/images/merchant/pay-'+(this.payStatus?'success':'fail')+'.png';
    this.name = '支付'+ (this.payStatus?'成功':'失败');
  },
  methods:{
  }
}
