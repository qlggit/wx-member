
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
      selectedCity:'',
      selectedCityCode:'',
      clubList:[]
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.autoVueObj = this;
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
    function getCode(name , call){
      name = name || '';
      WY.getCache('cityData',function(a){
        a.cityAllList.every(function(o){
          if(name === o.name){
            call(o.code);
            return false;
          }
          return true;
        });
        call(null);
      });
    }
    WY.oneReady('bmap-location' , function(o){
      var addressComponents = o.addressComponents;
      if(addressComponents){
        var name = addressComponents.city.replace(/市$/,'');
        that.selectedCity = name;
        getCode(name, function(code){
          that.selectedCityCityCode = code;
          that.reset();
          that.searchBanner();
          that.searchList();
        });
      }
    } , this);
    WY.oneBind('city-location',function(val){
      getCode(val , function(code){
        that.selectedCityCityCode = code;
        that.reset();
        that.searchBanner();
        that.searchList();
      });
    } , this);
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
      that.swiperList = [];
      WY.get('/merchant/list/banner',{
        clinetLoc:'WX',
        bannerTypeCode:this.bannerTypeCode
      },function(a){
        a.data.forEach(function(a){
          a.img = a.bannerUrl;
          a.filePath = a.bannerUrl;
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
      if(this.isLastPage === false){
        this.searchList();
      }
    }
  }
}
