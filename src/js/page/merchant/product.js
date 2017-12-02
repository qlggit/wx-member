export default{
  name:'merchant-product',
  data() {
    return {
      menuIndex:0,
      menuList:'',
      productList:[],
      allPrice:0,
      number:1,
      showThisWindow:false,
      name:'酒水单',
      tableAble:1,
      pageNum:1,
      maxListHeight:0,
      selectedList:'',
      productSelectListAble:0,
      allNumber:0,
      autoInitCount:0,
      payUrl:'',
      basePath:''
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    this.isServer = location.href.indexOf('server') > 0;
    this.basePath = this.isServer ? '/server/app' : '/merchant';
    this.productList = [];
    this.selectedList = WY.getLocalStorage('selectedList') || [];
    this.maxListHeight = WY.clientHeight -  WY.getScaleSize(100);
    WY.oneReady(this.isServer?'token-complete':'user-info',function(o){
        WY.get('/merchant/product/category' , function(data){
          that.menuList = data.data;
          that.autoInitCount ++;
          that.doSearch();
        });
    } , this);

    this.searchOrder();
  },
  methods:{
    searchOrder:function(){
      if(!this.selectedList || this.selectedList.length === 0 && WY.hrefData.seatOrderNo){
        var that = this;
        WY.get('/order/infoBySeat',{
          seatOrderNo:WY.hrefData.seatOrderNo,
        } , function(a){
          if(a.code === 0 && a.data.payStatus !== 'ALREADY_PAY'){
            var data = a.data;
            that.orderNo = data.orderNo;
            that.selectedList = data.detailLs.map(function(a){
              return {
                id:a.goodsId,
                name:a.goodsName,
                number:a.quantity,
                price:a.unitPrice,
              };
            });
            that.autoInitCount++;
            that.setAll();
            that.doSearch();
          }else{
            that.autoInitCount++;
            that.setAll();
            that.doSearch();
          }
        })
      }else {
        this.autoInitCount++;
        this.setAll();
        this.doSearch();
      }
    },
    doBuy:function(){
      var goodsLs = [];
      this.selectedList.forEach(function(a){
        goodsLs.push({
          goodsId:a.id,
          quantity:a.number
        });
      });
      if(!this.selectedList.length){
        WY.toast('请先选择要买的商品!');
        return false;
      }
      var that = this;
      WY.post('/order/add' , {
        goodsLs:goodsLs,
        supplierId:WY.hrefData.merchantId,
        seatId:WY.hrefData.seatId,
        seatOrderNo :WY.hrefData.seatOrderNo,
      } , function(a){
        if(a.code === 0){
          WY.setLocalStorage('selectedList',[]);
          vueRouter.push(WY.common.addUrlParam(that.basePath+'/pay',{
            seatOrderNo:WY.hrefData.seatOrderNo,
            merchantId:WY.hrefData.merchantId,
            seatId:WY.hrefData.seatId,
            orderNo:a.data,
          }));
        }else{
          WY.toast(a.message);
        }
      })
    },
    changeNumber:function(data){
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
      this.pageNum = 1;
      this.productList = [];
    },
    doSearch:function(){
      var that = this;
      if(this.autoInitCount > 1)WY.get('/merchant/product/list',{
        pageNum:this.pageNum++,
        supplierId:WY.hrefData.supplierId,
        goodsTypeId:this.menuList[this.menuIndex].yukeGoodsTypeId,
      } , function(data){
        var list = data.data.list;
        list.forEach(function(a){
          a.id = a.goodsId;
          a.name = a.goodsName;
          a.price = a.unitPrice ;
          //没选择过的 number初始化为0
          if(that.selectedList.every(function(b){
            if(b.id === a.id){
              a.number = b.number;
              return false;
            }
            return true;
            })) a.number = 0;
        });
        that.productList = that.productList.concat(list);
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
    },
  }
}
