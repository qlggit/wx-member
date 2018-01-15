import qrcode from '../../ui/qrcode.js';
export default{
  name:'my-qrcode',
  data() {
    return {
      userInfo:'',
      qrcodeUrl:'',
      qrcodeWidth:'',
    }
  },
  directives:{
    qrcode:{
      inserted:function(el , binding){
        var data = binding.value;
        qrcode(el,{
          width:data.width,
          height:data.height,
          text:data.qrcodeUrl
        });
      }
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.autoVueObj = this;
    var that = this;
    this.qrcodeWidth = WY.getScaleSize(402);
    WY.oneReady('user-info',function(o){
      that.userInfo = o;
      that.qrcodeUrl = JSON.stringify({
        data:o.userId.split('_')[0],
        type:'AddUser',
        version:1,
      });
    } , this);
  },
  methods:{
  }
}
