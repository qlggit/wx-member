export default{
  name:'merchant-pay',
  data() {
    return {
      name:'支付',
      selectedList:'',
      productPrice:0,
      productNumber:0,
      allPrice:0,
      payPrice:0,
      address:'',
      supplierName:'',
      seatData:'',
      orderNo:'',
      seatOrderNo:'',
      lowCostAmount:0,
      seatPayStatus:'',
      isOwner:'',
      deductibleAmount:0,
      hasSearchOrder:'',
      diffAmount:0,
      isServer:0,
      showAble:0,
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.loading(1);
    WY.autoVueObj = this;
      this.isServer = location.href.indexOf('server') > 0;
      this.basePath = this.isServer ? '/server/app' : '/merchant';
      var that = this;
      WY.oneReady(this.isServer?'token-complete':'user-info',function(o){
        that.doSearch(WY.hrefData.orderNo?'':WY.hrefData.seatOrderNo);
        if(WY.hrefData.seatOrderNo)that.searchSeatOrder();
      } , this);
  },
  methods:{
    doSum:function(){
      if(this.seatData && this.hasSearchOrder){
        if(this.selectedList){
          this.productPrice = WY.common.sum(this.selectedList,function(a){return (a&&(a.number * a.price) || 0)});
          this.productNumber = WY.common.sum(this.selectedList,function(a){return a&&a.number || 0});
        }
        this.allPrice = this.productPrice;
        if(!this.seatPayStatus && this.productPrice < this.lowCostAmount)this.allPrice = this.lowCostAmount;
        if(this.deductibleAmount > 0){
          this.diffAmount = Math.min(this.deductibleAmount , this.allPrice);
        }
        this.payPrice = (this.allPrice - this.diffAmount);
        console.log('seatPayStatus -- >  ' + this.seatPayStatus);
        console.log('productPrice -- >  '+this.productPrice);
        console.log('lowCostAmount -- >  '+this.lowCostAmount);
        console.log('allPrice -- >  '+this.allPrice);
        console.log('deductibleAmount -- >  '+this.deductibleAmount);
        console.log('diffAmount -- >  '+this.diffAmount);
        console.log('payPrice -- >  '+this.payPrice);
        this.showAble = 1;
        WY.loading(0);
      }
    },
    doSearch:function(seatOrderNo){
      var that = this;
      var url = seatOrderNo?'/order/infoBySeat':'/order/info';
      WY.get(url,{
        orderNo:WY.hrefData.orderNo,
        seatOrderNo:seatOrderNo,
      } , function(a){
        that.hasSearchOrder = 1;
        if(a.code === 0){
          var noPayObj;
          if(Array.isArray(a.data)){
            noPayObj = a.data && a.data.find(function(a){
              return a.payStatus !== 'ALREADY_PAY'  && WY.session.isOwner(a.userId);
            });
          }else{
            noPayObj = a.data.payStatus !== 'ALREADY_PAY' && WY.session.isOwner(a.data.userId) && a.data ;
          }
          if(noPayObj){
            that.orderNo = noPayObj.orderNo;
            that.selectedList = noPayObj.detailLs.map(function(a){
              return {
                name:a.goodsName,
                number:a.quantity,
                price:a.unitPrice,
                headImg:a.headImg,
                allPrice:a.unitPrice * a.quantity,
              };
            });
            if(noPayObj.seatOrderNo && !WY.hrefData.seatOrderNo){
              that.searchSeatOrder(noPayObj.seatOrderNo);
              return;
            }
          }
        }
        that.doSum();
      })
    },
    searchSeatOrder:function(orderNo){
      var seatOrderNo = orderNo || WY.hrefData.seatOrderNo;
      if(seatOrderNo){
        var that = this;
        WY.get('/order/seat/myInfo',{
          orderNo:seatOrderNo
        },function(a){
          var data = a.data[0];
          that.address = data.supplierName+'('+data.seatName+')';
          that.seatData = data;
          that.supplierName = data.supplierName;
          that.isOwner = WY.session.isOwner(data.userId);
          that.seatPayStatus = data.payStatus === 'ALREADY_PAY';
          if(data.deductibleAmount)that.deductibleAmount = data.deductibleAmount;
          if(!that.seatPayStatus && data.lowCostAmount)that.lowCostAmount = data.lowCostAmount;
          that.seatOrderNo = seatOrderNo;
          that.doSum();
        });
      }
    },
    doBuy:function(){
      var that = this;
      WY.post('/order/pay' , {
        orderNo:this.orderNo || this.seatOrderNo,
      } , function(a){
        if(a.code === 0){
          vueRouter.push(that.basePath + '/pay-complete?payStatus=1');
        }else{
          WY.toast(a.message);
        }
      })
    }
  }
}
