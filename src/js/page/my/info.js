export default{
  name:'my-info',
  data() {
    return {
      userInfo:'',
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    WY.oneReady('user-info',function(o){
      that.userInfo = o;
    } , this);
  },
  methods:{
  }
}
