export default{
  name:'login-phone',
  data() {
    return {
      title:'绑定手机',
      phone:'',
      smsCode:''
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.autoVueObj = this;
    var that = this;
    WY.oneReady('user-info',function(userInfo){
      if(userInfo && (userInfo.userName || userInfo.mobile)){
         vueRouter.push('/');
      }
    } , this);
  },
  methods:{
    doBuild:function(){
      console.log(this.phone , this.smsCode);
      if(!this.phone || !/^1\d{10}$/.test(this.phone)){
        WY.toast('请输入有效的手机号');
        return false;
      }
      if(!this.smsCode || !/^\d+$/.test(this.smsCode)){
        WY.toast('请输入有效的验证码');
        return false;
      }
      var that = this;
      WY.post('/login/build',{
        sendType:'BINDING',
        phone:this.phone,
        smsCode:this.smsCode
      },function(a){
        if(a.code == 0){
          WY.session.userInfo = a.data;
          WY.ready('user-info');
          vueRouter.push('/');
        }else{
          WY.toast(a.message);
        }
      });
    }
  }
}
