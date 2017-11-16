export default{
  name:'merchant-pay-complete',
  data() {
    return {
      name:'',
      payStatus:'',
      payImg:'',
    }
  },
  beforeDestroy:function(){
  },
  created:function(){
    this.payStatus = (WY.hrefData.payStatus || Math.round(Math.random())) - 0 === 1;
    this.payImg = '/images/merchant/pay-'+(this.payStatus?'success':'fail')+'.png';
    this.name = '支付'+ (this.payStatus?'成功':'失败');
  },
  methods:{
  }
}
