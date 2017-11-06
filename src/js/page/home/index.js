export default{
  name:'home-index',
  data() {
    return {
      title:'首页',
      headMenu:['酒吧','清吧','KTV'],
      headActiveIndex:0,
      swiperList:[
        '/images/demo.png','/images/demo.png','/images/demo.png','/images/demo.png','/images/demo.png'],
      clubList:[
        {
          name:'CLUB QUEEN',
          address:'重庆观音桥',
          distance:'5.5km',
          img:'/images/demo.png',
        },
        {
          name:'CLUB QUEEN',
          address:'重庆观音桥',
          distance:'5.5km',
          img:'/images/demo.png',
        },
        {
          name:'CLUB QUEEN',
          address:'重庆观音桥',
          distance:'5.5km',
          img:'/images/demo.png',
        },
      ]
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    WY.oneReady('user-info',function(o){
        if(!o || !o.phone){
          //vueRouter.push('/login/phone');
        }
    } , this);
  },
  methods:{
    headMenuClick:function(index){
      this.headActiveIndex = index;
    }
  }
}
