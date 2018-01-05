export default{
  name:'my-index',
  data() {
    return {
      headMenu: ['我要取酒', '我要存酒', '存酒记录'],
      headIndex: 0,
      swiperOption: {
        autoPlay:0,
        autoHeight:true,
        onSlideChangeEnd:(swiper)=>{
          this.headIndex = swiper.realIndex
        }
      },
      placeList: '',
      placeIndex: 0,
      autoPlace:{
        id:4,
        name:'X酒吧'
      },
      wineList:[
        {
          id:1,
          name:'A酒',
          number:Math.ceil(Math.random()*10)
        },
        {
          id:2,
          name:'B酒',
          number:Math.ceil(Math.random()*10)
        },
        {
          id:3,
          name:'C酒',
          number:Math.ceil(Math.random()*10)
        },
      ],
      swiperData:{},
      morePlaceAble:0,
      swiperHeight:0,
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  watch:{
    headIndex:function(v){
      this.$refs.mySwiper.swiper.slideTo(v);
    }
  },
  created:function(){
    WY.autoVueObj = this;
    var that = this;
    this.swiperHeight = WY.clientHeight - WY.getScaleSize(202);
    WY.loading(1);
    WY.oneReady('user-info',function(o){
      that.userInfo = o;
      that.searchPlace();
    } , this);
  },
  methods:{
    doSearch:function(){
    },
    searchPlace:function(){
      var that = this;
      $.get('/my/wine/merchant',{
        pageNum:1,
        pageSize:10
      },function(a){
        WY.loading(0);
        that.placeList = a.data.list.map(function(a){
          return {
            id:a.supplierId,
            name:a.supplierName ,
          }
        })
      })
    },
    selectPlace:function(index){
      this.placeIndex = index;
      this.morePlaceAble = 0;
    },
    showMorePlace:function(sts){
      this.morePlaceAble = sts === undefined?!this.morePlaceAble:sts;
    }
  }
}
