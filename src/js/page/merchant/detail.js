export default{
  name:'merchant-detail',
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
      headFile:'',
      isServer:0,
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.autoVueObj = this;
    this.merchantId = WY.hrefData.merchantId;
    this.isServer = location.href.indexOf('server') > 0;
    this.basePath = this.isServer ? '/server/app' : '/merchant';
    var that = this;
    WY.oneReady(this.isServer?'token-complete':'user-info',function(o){
      WY.get('/merchant/detail/info',{
        supplierId:that.merchantId
      } , function(data){
        data = data.data;
        that.activity = data.actFile;
        that.showInfo = data.envFile;
        that.lvl = data.supplierStar;
        that.headFile = data.headFile;
        that.name = data.supplierName;
        that.latitude = data.gpsDimension;
        that.longitude = data.gpsLongitude;
        that.address = data.supplierAddr;
        that.remark = data.companyProfile;
      });
    } , this);

  },
  methods:{
    headMenuClick:function(index){
      this.headActiveIndex = index;
    }
  }
}
