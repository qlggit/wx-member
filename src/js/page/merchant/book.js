export default{
  name:'merchant-book',
  data() {
    return {
      footerList:[
        {
          name:'可选',
          img:'/images/merchant/book-sts-1.png'
        },
        {
          name:'我的',
          img:'/images/merchant/book-sts-2.png'
        },
        {
          name:'拼桌',
          img:'/images/merchant/book-sts-3.png'
        },
        {
          name:'已选',
          img:'/images/merchant/book-sts-4.png'
        }
      ],
      showThisWindow:false,
      name:'',
      selectDate:'',
      startDate:WY.common.parseDate(new Date , 'Y-m-d'),
      svgBackData:'',
      seatData:'',
      dateVisible:'',
      seatItemList:'',
      toBuyWine:1,
      hrefSeatOrderId:'',
      seatOrderList:'',
      basePath:'',
      isServer:0,
      hasPing:0,
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    localStorage.selectedList = '';
    this.hasPing = WY.session.hasPing;
    var that = this;
    this.isServer = location.href.indexOf('server') > 0;
    this.basePath = this.isServer ? '/server/app' : '/merchant';
    this.selectDate = WY.common.parseDate(new Date,'Y-m-d');
    WY.oneReady(this.isServer?'token-complete':'user-info',function(o){
      that.doSearch();
      WY.get('/merchant/detail/info',{
        supplierId:WY.hrefData.merchantId
      } , function(data){
        data = data.data;
        that.name = data.supplierName;
      });
    } , this);
    //显示一个人的信息
    WY.oneBind('show-user-info',function(userId){

    } , this);
    //svg 显示完成
    WY.oneBind('svg-show-complete',function(){
      that.setUserInfo();
    } , this);
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
              this.seatData = '';
              WY.toast('当前座位不允许拼桌');
              return false;
            }
            if(seatData.allGroup >=3){
              this.seatData = '';
              WY.toast('当前座位超出拼桌次数');
              return false;
            }
          }
        }
        else{
          this.seatData = '';
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
      })[type] + '-' +  d.seatShape;
      var data = {
        type:type,
        svgData:{
          backImg:img,
          headImg:'',
          type:type,
          seatType:d.seatType,
          x:d.seatX ,
          y:d.seatY ,
          seatStatus :d.seatStatus ,
          seatId:d.yukeSupplierSeatId,
          orderNo:d.orderNo,
          seatShape:d.seatShape,
          seatName:d.seatName ,
          lowCostAmount:d.lowCostAmount,
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
      };
      return data;
    },
    setImg:function(list){
      list.forEach(function(data){
        var svgData = data.svgData;
        //已选 不可选+不允许拼桌
        if(!svgData.selectAble || !svgData.tableAble){
          svgData.backImg += '-selected.png';
        }else if(svgData.hasMe){
          //我的
          svgData.backImg += '-my.png';
        }else if(!svgData.isSelected){
          //可选
          svgData.backImg += '-able.png';
        }else{
          //可拼桌
          svgData.backImg += '-ping.png';
        }
      })
    },
    setUserInfo:function(){
      //显示座位上的人头像
      if(this.seatItemList)this.seatItemList.forEach(function(data){
        var svgData = data.svgData;
        if(svgData.userId && !WY.session.isOwner(svgData.userId))
          WY.trigger('set-user-head-img', svgData , {
            userId:svgData.userId,
            headImg:svgData.headImg,
            done:function(headImgSvg , svgData){
              headImgSvg.onclick = function(){
                WY.trigger('show-user-info' , svgData.userId);
              };
            }
          });
      });
    },
    makeBackImg:function(backImg , call){
      if(this.svgBackData) return call();
      var img = new Image;
      img.src = backImg;
      var that = this;
      img.onload = function(){
        that.svgBackData = {
          img:backImg,
          backWidth:img.width,
          backHeight:img.height,
        };
        call();
      }
    },
    doSearch:function(){
      this.seatData = '';
      WY.ready('set-svg-list',[]);
      var itemList = [];
      var that = this;
      WY.get('/merchant/seat/data',{
        supplierId:WY.hrefData.supplierId,
      } , function(a){
        that.makeBackImg(a.data[0].filter(function(a){return a.supplierFileType==='seat_black'}).pop().filePath , function(){
          a.data[1].forEach(function(d){
            itemList.push(that.makeSvgItem(d));
          });
          that.searchOrder(itemList);
        });
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
          //找到座位的相关订单
          var thisList = seatOrderList.filter(function(a){
            return a.seatId == svgData.seatId;
          });
          if(thisList.length){
            svgData.isSelected = 1;
            svgData.allGroup = 1;
            thisList.every(function(a){
              svgData.tableAble = a.tableStatus === 'y' && a.pzStatus !== 'end';
              svgData.userId = a.userId;
              svgData.orderNo = a.orderNo;
              //是我的订单
              if(WY.session.isOwner(a.userId)){
                svgData.hasMe = 1;
                svgData.isMe = 1;
                if(a.payStatus !== 'ALREADY_PAY'){
                  if(!hasPayConfirm)WY.confirm({
                    cancelText:'买酒',
                    submitText:'支付',
                    content:'您已有未支付的订座订单！',
                    done:function(v){
                      vueRouter.push(v?
                        (
                          WY.common.addUrlParam(that.basePath+'/pay',{
                            seatId:a.seatId,
                            seatOrderNo:a.orderNo,
                            supplierId:a.supplierId,
                          })
                        ):(
                          WY.common.addUrlParam(that.basePath+'/product',{
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
                svgData.headImg = a.headImg;
                if(!that.hasPing){
                  svgData.selectAble = false;
                }
                //当前座位的拼桌信息
                var tableLs = a.tableLs;
                if(tableLs){
                  if(!tableLs.every(function(o , i){
                      //有我的申请
                      if(WY.session.isOwner(o.userId)){
                        if(o.isAgree ==='y'){
                          svgData.allGroup++;
                          svgData.hasMe = 1;
                        }
                        else if(o.isAgree ==='n'){
                          //被拒绝
                          svgData.tableAble = false;
                        }else{
                          //正在申请中
                          svgData.isTableAppling = 1;
                          svgData.hasMe = 1;
                        }
                        return false;
                      }
                      return true;
                    })){

                  }
                }
              }
              return true;
            })
          }
        });
        that.setImg(itemList);
        that.seatItemList = itemList;
        WY.ready('set-svg-list',itemList);
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
      var selectDate = v.map(function(a){return a.padStart(2 , '0');}).join('-');
      if(this.selectDate !== selectDate){
        this.doSearch();
        this.selectDate = selectDate;
      }
    },
    changeTableAble:function(){
      var seatData = this.seatData;
      if(!seatData.isSelected){
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
      //正在申请中
      if(seatData.isTableAppling)return false;
      if(seatData.hasMe){
        vueRouter.push( WY.common.addUrlParam(this.basePath+'/product',{
          seatId:seatData.seatId,
          seatOrderNo:seatData.orderNo,
          supplierId:WY.hrefData.supplierId,
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
        userNum:this.seatData.myNumber,
        orderType:this.seatData.isSelected?'table':'normal',
        seatId:this.seatData.seatId,
        orderNo:this.seatData.orderNo,
        tableStatus:this.seatData.tableAble?'y':'n',
        shippingWine:this.toBuyWine - 0,
        supplierId:WY.hrefData.supplierId,
      };
      var that = this;
      WY.post('/order/seat/'+(data.orderType === 'table'?'pz':'add'),data , function(a){
        if(a.code === 0){
          if(data.orderType === 'table'){
            WY.toast('拼桌申请成功，请等待通过');
          }
          else {
            if(!data.shippingWine){
              vueRouter.push( WY.common.addUrlParam(that.basePath + '/pay',{
                seatOrderNo:a.data,
                supplierId:data.supplierId,
                seatId:data.seatId,
              }));
            }
            else vueRouter.push( WY.common.addUrlParam(that.basePath +'/product',{
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
  }
}
