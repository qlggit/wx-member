export default{
  name:'home-index',
  data() {
    return {
      merchantId:1,
      headerBanner:'',
      lvl:'',
      name:'',
      latitude:'',
      longitude:'',
      address:'',
      remark:'',
      activity:'',
      showInfo:'',
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    this.merchantId = WY.hrefData.merchantId;
    var that = this;
    WY.oneReady('user-info',function(o){
        if(!o || !o.phone){
          //vueRouter.push('/login/phone');
        }
        WY.get('/merchant/detail/data' , function(data){
          data = data.data;
          that.headerBanner = data.headerBanner;
          that.lvl = data.lvl;
          that.name = data.name;
          that.latitude = data.latitude;
          that.longitude = data.longitude;
          that.address = data.address;
          that.remark = data.remark;
          that.activity = data.activity;
          that.showInfo = data.showInfo;
        });
    } , this);
  },
  methods:{
    headMenuClick:function(index){
      this.headActiveIndex = index;
    }
  }
}
