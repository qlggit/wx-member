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
  }
}
