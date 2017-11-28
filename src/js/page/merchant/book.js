export default{
  name:'merchant-book',
  data() {
    return {
      footerList:[
        {
          name:'可选',
          color:'rgb(104,104,104)',
          img:'/images/merchant/book-sts-1.png'
        },
        {
          name:'已选',
          color:'rgb(24,24,24)',
          img:'/images/merchant/book-sts-2.png'
        },
        {
          name:'锁定',
          color:'rgb(185,50,126)',
          img:'/images/merchant/book-sts-3.png'
        },
        {
          name:'拼桌',
          color:'rgb(205,155,21)',
          img:'/images/merchant/book-sts-4.png'
        },
        {
          name:'我的',
          color:'rgb(54,17,213)',
          img:'/images/merchant/book-sts-5.png'
        },
      ],
      showThisWindow:false,
      name:'',
      selectDate:'',
      startDate:WY.common.parseDate(new Date , 'Y-m-d'),
      svgBackImg:'',
      seatData:'',
      dateVisible:'',
      seatItemList:[],
      toBuyWine:1,
      hrefSeatOrderId:'',
      seatOrderList:'',
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    localStorage.selectedList = '';
    var that = this;
    this.selectDate = WY.common.parseDate(new Date,'Y-m-d');
    WY.oneReady('user-info',function(o){
        WY.get('/merchant/detail/info',{
          supplierId:WY.hrefData.merchantId
        } , function(data){
          data = data.data;
          that.name = data.supplierName;
        });
    } , this);
    this.doSearch();
  },
  methods:{
    changeNumber:function(data){
      this.seatData.myNumber = data.number;
    },
    showConfirmWindow:function(v){
      var seatData = this.seatData;
      if(v && seatData){
        if(seatData.selectAble){
          if(seatData.isSelected && !seatData.hasMe){
            if(!seatData.tableAble){
              WY.toast('当前座位不允许拼桌');
              return false;
            }
            if(seatData.allGroup >=3){
              WY.toast('当前座位超出拼桌次数');
              return false;
            }
          }
        }
        else{
          WY.toast('当前座位不可预订');
          return false;
        }
      }else{
      }
      this.showThisWindow = v;
    },
    doSelectDate:function(){
      this.dateVisible = 1;
    },
    makeSvgItem:function(d){
      var type = ({
        seat:'table',
        room:'room'
      })[d.seatType];
      var img = '/images/seat/'+({
        table:'table',
        room:'room'
      })[type] + '.png';
      return {
        type:type,
        svgData:{
          backImg:img,
          type:type,
          seatType:d.seatType,
          x:d.seatX ,
          y:d.seatY ,
          seatStatus :d.seatStatus ,
          seatId:d.yukeSupplierSeatId,
          seatShape:d.seatShape,
          seatName:d.seatName ,
          lowCostAmount:d.lowCostAmount ,
          locCount:d.locCount ,
          isSelected:0,
          selectAble:d.seatStatus !=='lock',
          isMe:0,
          hasMe:0,
          tableAble:1,
          hadCount:d.hadCount || 0 ,
          allGroup:0,
          myNumber:1,
          addAble:1,
        }
      }
    },
    doSearch:function(){
      this.seatData = '';
      this.seatItemList.splice(0);
      var seatItemList = [];
      var that = this;
      WY.get('/merchant/seat/data',{
        supplierId:WY.hrefData.supplierId,
      } , function(a){
        that.svgBackImg = a.data[0].filter(function(a){return a.supplierFileType==='seat_black'}).pop().filePath;
        a.data[1].forEach(function(d){
          seatItemList.push(that.makeSvgItem(d));
        });
        that.searchOrder(seatItemList);
      });
    },
    searchOrder:function(itemList){
      var that = this;
      WY.get('/order/seat/list',{
        supplierId:WY.hrefData.supplierId,
        startDate:this.selectDate,
        endDate :this.selectDate,
        pageNum:1,
        pageSize:200,
      } , function(a){
        var seatOrderList = that.seatOrderList = a.data.list;
        var hasPayConfirm;
        if(seatOrderList && seatOrderList.length)itemList.forEach(function(a){
          var svgData = a.svgData;
          var thisList = seatOrderList.filter(function(a){
            return a.seatId == svgData.seatId;
          });
          if(thisList.length){
            svgData.isSelected = 1;
            svgData.allGroup = thisList.length;
            thisList.every(function(a){
              if(a.orderType === 'normal'){
                svgData.tableAble = a.tableStatus === 'y';
                svgData.userId = a.userId;
              }
              if(WY.session.isOwner(a.userId)){
                svgData.hasMe = 1;
                if(a.orderType === 'normal'){
                  svgData.isMe = 1;
                  if(a.payStatus === 'NOT_PAY'){
                    if(!hasPayConfirm)WY.confirm({
                      cancelText:'买酒',
                      submitText:'支付',
                      content:'您已有未支付的订座订单！',
                      done:function(v){
                        vueRouter.push(v?
                          (
                            WY.common.addUrlParam('/merchant/product',{
                              seatId:a.seatId,
                              seatOrderNo:a.orderNo,
                              supplierId:a.supplierId,
                            })
                          ):(
                            WY.common.addUrlParam('/merchant/pay',{
                              payType:'seat',
                              seatId:a.seatId,
                              seatOrderNo:a.orderNo,
                              supplierId:a.supplierId,
                            })
                          ))
                      }
                    });
                    hasPayConfirm = 1;
                  }
                }else{
                    if(a.pzStatus === null){
                      svgData.isTableAppling = 1;
                    }
                }
              }
              return true;
            })
          }
        });
        that.seatItemList = itemList;
      });
    },
    svgClick:function(e , type , data){
      if(type === 'svg'){
        return false;
      }
      this.seatData = data;
      console.log(data);
      this.showConfirmWindow(1);
    },
    onValuesChange:function(v){
      this.selectDate = v.join('-');
    },
    changeTableAble:function(){
      var seatData = this.seatData;
      if(!seatData.isSelected || seatData.isMe){
        seatData.tableAble = !seatData.tableAble;
      }
    },
    goNext:function(){
      if(!this.seatData){
        return WY.toast('请先选择座位');
      }
      this.showConfirmWindow(1);
    },
    doSubmit:function(){
      var seatData = this.seatData;
      if(seatData.isTableAppling)return false;
      if(seatData.hasMe){
        vueRouter.push( WY.common.addUrlParam('/merchant/product',{
          seatId:seatData.seatId,
          seatOrderNo:seatData.orderNo,
          supplierId:seatData.supplierId,
        }));
        return false;
      }
      if(seatData.allGroup >= 3){
        WY.toast('拼桌人次达到上限');
        return false;
      }
      var data = {
        bookTime:this.selectDate,
        orderNum:this.seatData.myNumber,
        orderType:this.seatData.isSelected?'table':'normal',
        seatId:this.seatData.seatId,
        tableStatus:this.seatData.tableAble?'y':'n',
        shippingWine:this.toBuyWine - 0,
        supplierId:WY.hrefData.supplierId,
      };
      WY.post('/order/seat/add',data , function(a){
        if(a.code == 0){
          if(data.orderType === 'table'){
            WY.toast('拼桌申请成功，请等待通过');
          }
          else {
            if(!data.shippingWine){
              vueRouter.push( WY.common.addUrlParam('/merchant/pay',{
                payType:'seat',
                seatOrderNo:a.data,
                supplierId:data.supplierId,
                seatId:data.seatId,
              }));
            }
            else vueRouter.push( WY.common.addUrlParam('/merchant/product',{
              seatId:data.seatId,
              seatOrderNo:a.data,
              supplierId:data.supplierId,
            }));
          }
        }else{
          WY.toast(a.message);
        }
      });
    }
  },
  watch:{
    selectDate:function(v , o){
      if(o){
        this.doSearch();
      }
    }
  }
}
