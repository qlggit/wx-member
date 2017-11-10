export default{
  name:'merchant-product',
  data() {
    return {
      menuIndex:0,
      menuList:'',
      productList:'',
      allPrice:0,
      number:1,
      showThisWindow:false,
      name:'酒水单',
      tableAble:1,
      page:0,
      maxListHeight:0,
      selectedList:'',
      productSelectListAble:0,
      allNumber:0,
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    this.productList = [];
    this.selectedList = WY.getLocalStorage('selectedList') || [];
    this.maxListHeight = WY.clientHeight -  WY.getScaleSize(100);
    WY.oneReady('user-info',function(o){
        WY.get('/merchant/product/category' , function(data){
          that.menuList = data.data;
        });
        that.doSearch();
    } , this);
    this.setAll();
  },
  methods:{
    changeNumber:function(data){
      console.log(data);
      //列表选取
      var that = this;
      if(data.number < 1){
        //移除选择
        this.selectedList.every(function(a , i){
          if(a && a.id === data.dataId){
            that.selectedList.splice( i , 1);
            return false;
          }
          return true
        });//归0
        this.productList.every(function(a , i){
          if(a && a.id === data.dataId){
            a.number = 0;
            return false;
          }
          return true
        });
      }
      else{
        this.productList.every(function(a){
          if(a && a.id === data.dataId){
            a.number = data.number;
            return false;
          }
          return true
        });
        this.selectedList.every(function(a){
          if(a && a.id === data.dataId){
            a.number = data.number;
            return false;
          }
          return true
        });
        if(data.type === 'auto'){
          //已选
          if(this.selectedList.every(function(a){
              if(a && a.id === data.dataId){
                return false;
              }
              return true
            })){
            this.selectedList.push(this.productList.find(function(a){
              if(a && a.id === data.dataId){
                a.number = a.number || 1;
                return true;
              }
            }));
          }
        }
      }
      this.setAll();
    },
    setAll:function(){
      this.allNumber = WY.common.sum(this.selectedList,function(a){return a&&a.number || 0});
      this.allPrice = WY.common.sum(this.selectedList,function(a){return (a&&(a.number * a.price) || 0)});
      WY.setLocalStorage('selectedList',this.selectedList);
    },
    showConfirmWindow:function(v){
      this.showThisWindow = v;
    },
    tableChange:function(){
      this.tableAble = !this.tableAble;
    },
    reset:function(){
      this.page = 0;
      this.productList = [];
    },
    doSearch:function(){
      var that = this;
      WY.get('/merchant/product/list' , function(data){
        data.data.forEach(function(a){
          //没选择过的 number初始化为0
          if(that.selectedList.every(function(b){
            if(b.id === a.id){
              a.number = b.number;
              return false;
            }
            return true;
            })) a.number = 0;
        });
        that.productList = that.productList.concat( data.data);
      });
    },
    changeMnuIndex:function(index , data){
      this.menuIndex = index;
      this.reset();
      this.doSearch();
    },
    showSelectedProductList:function(v){
      if(v === undefined)v = ! this.productSelectListAble;
      this.productSelectListAble = v;
    }
  }
}
