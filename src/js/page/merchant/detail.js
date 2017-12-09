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
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.autoVueObj = this;
    this.merchantId = WY.hrefData.merchantId;
    var that = this;
    WY.oneReady('user-info',function(o){

    } , this);
    WY.get('/merchant/detail/listAll',{
      supplierId:this.merchantId
    } , function(data){
      data = data.data;
      that.headerBanner = data[0];
      that.activity = data[1];
      that.showInfo = data[2];

    });
    WY.get('/merchant/detail/info',{
      supplierId:this.merchantId
    } , function(data){
      data = data.data;
      that.lvl = data.supplierStar;
      that.headFile = data.headFile;
      that.name = data.supplierName;
      that.latitude = data.gpsDimension;
      that.longitude = data.gpsLongitude;
      that.address = data.supplierAddr;
      that.remark = data.companyProfile;
    });
  },
  methods:{
    headMenuClick:function(index){
      this.headActiveIndex = index;
    }
  }
}
