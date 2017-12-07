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
      basePath:'',
      isServer:0,
      orderNo:'',
      seatPayStatus:'',
      oldList:[],
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
    this.maxListHeight = WY.clientHeight -  WY.getScaleSize(100);
    WY.oneReady(this.isServer?'token-complete':'user-info',function(o){
      that.searchOrder();
      that.searchSeatOrder();
        WY.get('/merchant/product/category' , function(data){
          that.menuList = data.data;
          that.autoInitCount ++;
          that.doSearch();
        });
    } , this);
  },
  methods:{
    searchSeatOrder:function(){
      var that = this;
      WY.get('/order/seat/myInfo',{
        orderNo:WY.hrefData.seatOrderNo
      },function(a){
        var data = a.data[0];
        if(data)that.seatPayStatus = data.payStatus === 'ALREADY_PAY';
      });
    },
    searchOrder:function(){
      if(WY.hrefData.seatOrderNo){
        var that = this;
        WY.get('/order/infoBySeat',{
          seatOrderNo:WY.hrefData.seatOrderNo,
        } , function(a){
          if(a.code === 0 ){
            var noPayObj = a.data && a.data.find(function(a){
              return a.payStatus !== 'ALREADY_PAY';
            });
            if(noPayObj){
              that.orderNo = noPayObj.orderNo;
              that.selectedList = noPayObj.detailLs.map(function(a){
                that.oldList.push({
                  id:a.goodsId,
                  number:a.quantity,
                });
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
              return false;
            }
          }else{
            that.selectedList = WY.getLocalStorage('selectedList') || [];
            that.autoInitCount++;
            that.setAll();
            that.doSearch();
          }
        })
      }else {
        this.selectedList = WY.getLocalStorage('selectedList') || [];
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
      var that = this;
      if(this.seatPayStatus && !goodsLs.length){
        WY.toast('请选择要购买的商品！');
        return false;
      }
      this.toCancel(function(sts){
        if(!sts && goodsLs.length){
          WY.post('/order/add' , {
            goodsLs:goodsLs,
            supplierId:WY.hrefData.merchantId,
            seatId:WY.hrefData.seatId,
            seatOrderNo :WY.hrefData.seatOrderNo,
          } , function(a){
            if(a.code === 0){
              that.toPay(a.data);
            }else{
              WY.toast(a.message);
            }
          })
        }else that.toPay();
      });
    },
    toCancel:function(call){
      if(this.orderNo){
        var that = this;
        if(this.selectedList.length === this.oldList.length){
          if(this.selectedList.every(function(a){
            var oldObj = that.oldList.find(function(b){
              return a.id === b.id;
            });
            return oldObj && oldObj.number === a.number;
            })){
            //前后相同 不需要取消 也不需要新增
            return call && call(1);
          }
        }
        WY.post('/order/cancel',{
          orderNo:this.orderNo
        },function(){
          call && call();
        })
      }else call && call();
    },
    toPay:function(orderNo){
      WY.setLocalStorage('selectedList',[]);
      vueRouter.push(WY.common.addUrlParam(this.basePath+'/pay',{
        seatOrderNo:WY.hrefData.seatOrderNo,
        merchantId:WY.hrefData.merchantId,
        seatId:WY.hrefData.seatId,
        orderNo:orderNo,
      }));
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
