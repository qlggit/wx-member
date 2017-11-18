export default{
  name:'home-index',
  data() {
    return {
      title:'首页',
      headMenu:[{
        name:'酒吧',
        code:'bar',
      },{
        name:'清吧',
        code:'clear',
      },{
        name:'KTV',
        code:'ktc',
      }],
      headActiveIndex:0,
      clubSearchAble:false,
      bannerTypeCode:'bar',
      swiperList:'',
      isLastPage:'',
      pageNum:1,
      clubList:[]
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
    WY.oneBind('scroll-bottom',function(o){
        console.log('scroll-bottom');
        that.showMore();
    } , this);
    this.searchBanner();
    this.searchList();
  },
  methods:{
    headMenuClick:function(index){
      this.headActiveIndex = index;
      this.bannerTypeCode = this.headMenu[index].code;
      this.reset();
      this.searchBanner();
      this.searchList();
    },
    searchBanner:function(){
      var that = this;
      WY.get('/merchant/list/banner',{
        bannerTypeCode:this.bannerTypeCode
      },function(a){
        a.data.forEach(function(a){
          a.img = a.bannerUrl;
        });
        that.swiperList = a.data;
      });
    },
    searchList:function(){
        var that = this;
        if(this.isSearch)return false;
        this.isSearch = 1;
        WY.get('/merchant/list/data',{
          supplierTypeCode:this.bannerTypeCode,
          pageNum:this.pageNum++,
        },function(a){
          that.isSearch = 0;
          that.isLastPage = a.data.isLastPage;
          that.clubList = that.clubList.concat(a.data.list);
        })
    },
    reset:function(){
      this.pageNum = 1;
      this.clubList = [];
    },
    showClubSearch:function(index){
      this.clubSearchAble = 1;
    },
    showMore:function(){
      if(this.isLastPage == false){
        this.searchList();
      }
    }
  }
}
