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
      placeList: [
        {
          id:1,
          name:'A酒吧'
        },
        {
          id:2,
          name:'B酒吧'
        },
        {
          id:3,
          name:'C酒吧'
        },
      ],
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
    var that = this;
    this.swiperHeight = WY.clientHeight - WY.getScaleSize(202);
    WY.oneReady('user-info',function(o){
      that.userInfo = o;
    } , this);
  },
  methods:{
    doSearch:function(){
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
