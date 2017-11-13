export default{
  name:'home-index',
  data() {
    return {
      title:'首页',
      headMenu:['酒吧','清吧','KTV'],
      headActiveIndex:0,
      clubSearchAble:false,
      swiperList:[],
      clubList:''
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    WY.oneReady('user-info',function(o){
    } , this);
    WY.oneBind('club-search',function(o){
        that.clubSearchAble = o;
    } , this);
    this.doSearch();
  },
  methods:{
    headMenuClick:function(index){
      this.headActiveIndex = index;
      this.reset();
      this.doSearch();
    },
    doSearch:function(){
      var that = this;
        WY.get('/merchant/list/data',{},function(a){
          that.clubList = a.data.shops;
          that.swiperList = a.data.banner;
        })
    },
    reset:function(){
      this.page = 0;
      this.clubList = [];
    },
    showClubSearch:function(index){
      this.clubSearchAble = 1;
    }
  }
}
