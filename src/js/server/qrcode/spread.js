export default{
  name:'server-qrcode-spread',
  data() {
    return {
      title:'',
      phone:'',
      smsCode:'',
      needPhone:'',
      showAble:0,
      showText:'',
      spreadUserName:''
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.autoVueObj = this;
    var that = this;
    WY.oneReady('token-complete',function(){
      that.searchInfo(WY.session.userInfo);
    },this);
  },
  methods:{
    searchInfo:function(userInfo){
      this.showAble = 1;
        if(userInfo && userInfo.mobile){
          this.title = '欢迎使用娱客';
          this.showText = '您已经是平台用户';
          this.needPhone = false;
          return false;
        }else{
            this.searchSpread();
        }
        this.needPhone = true;
        this.title = '绑定手机';
    },
    searchSpread:function(){
      var that = this;
      WY.get('/user/other/info',{
          userId:WY.hrefData.spreadUserId,
        } , function(data){
          if(data.code === 0){
            that.spreadUserName = data.data.nickname;
          }else{

          }
      })
    },
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
      var url = '/server/qrcode/spread';
      WY.post(url,{
        sendType:'BINDING',
        phone:this.phone,
        smsCode:this.smsCode
      },function(a){
        if(a.code === 0){
          WY.trigger('login-flush');
          if(that.spreadUserName){
            that.showText = '您已接受' + that.spreadUserName + '的邀请';
          }else{
            that.showText = '你已成为平台用户';
          }
          that.needPhone = false;
        }else{
          WY.toast(a.message);
        }
      });
    }
  }
}
