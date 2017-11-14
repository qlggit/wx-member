export default{
  name:'login-phone',
  data() {
    return {
      title:'基本资料',
      userInfo:'',
      sexList:['帅哥','美女'],
      selectSex:0,
      ageList:[],
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    for(var i=18;i<=80;i++){
      this.ageList.push(i);
    }
    WY.oneReady('user-info',function(o){
      that.selectSex = 1 - o.sex;
      o.age = o.age || '';
      that.userInfo = o;
    } , this);
  },
  methods:{
    selectAge:function(e){
      this.userInfo.age = e.target.value;
    }
  }
}
