export default{
  name:'home-index',
  data() {
    return {
      title:'绑定手机'
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    WY.oneReady('user-info',function(o){
        if(!o || !o.phone){
          vueRouter.push('/login/phone');
        }
    } , this);
  },
  methods:{
    listContentTipTap:function(index){
      var obj = this.list[index];
      obj.listContentTip = !obj.listContentTip;
    }
  }
}
