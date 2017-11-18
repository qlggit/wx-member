import makeSvg from '../../../../components/common/make-svg.vue';
export default{
  name:'admin-seat-create',
  components:{
    'wy-make-svg':makeSvg
  },
  data() {
    return {
      userInfo:'',
      showAble:0,
      hasBackImg:0,
      autoBackList:[
        {
          name:'背景图',
          code:'back',
          img:'',
        },
        {
          name:'效果图',
          code:'main',
          img:'',
        }
      ],
      backImg:'',
      seatData:'',
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
    this.searchBack();
  },
  methods:{
    searchBack:function(){
      var that = this;
      WY.get('/server/admin/seat/search',{supplierId:WY.hrefData.supplierId},function(a){
        if(a.data[0]){
          that.backImg = a.data[0];
        }
        if(a.data[1]){
          that.seatData = a.data[1];
        }
        that.showAble = 1;
      })
    },
    fileChange:function(e){
      var fileEle = e.target;
      if(fileEle.value){
        var data = {
          file:fileEle.files[0]
        };
        var index = e.target.dataset.index;
        var that = this;
        WY.postFile('/file/api' , data,function(a){
          if(a.status == true){
            that.autoBackList[index].img = a.data.path;
          }
        });
      }
    }
  }
}
