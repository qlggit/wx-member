export default{
  name:'merchant-book',
  data() {
    return {
      footerList:[
        {
          name:'可选',
          img:'/images/merchant/book-sts-able.png'
        },
        {
          name:'我的',
          img:'/images/merchant/book-sts-my.png'
        },
        {
          name:'拼桌',
          img:'/images/merchant/book-sts-ping.png'
        },
        {
          name:'已定',
          img:'/images/merchant/book-sts-selected.png'
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
    WY.loading(1);
    WY.autoVueObj = this;
    localStorage.selectedList = '';
    var that = this;
    WY.oneReady('session-complete',function(session){
      that.hasPing = session.hasPing;
    } , this);
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
      }
      this.showThisWindow = v;
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
          x:d.seatX - 0 ,
          y:d.seatY - 0,
          seatStatus :d.seatStatus ,
          seatId:d.yukeSupplierSeatId,
          orderNo:d.orderNo,
          seatShape:d.seatShape,
          seatName:d.seatName ,
          lowCostAmount:d.lowCostAmount,
          locCount:d.locCount ,
          isSelected:d.seatStatus === 'selected',
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
        if(svgData.hasMe){
          //我的
          svgData.backImg += '-my.png';
        }
        //已选 不可选+不允许拼桌
        else if(!svgData.selectAble || !svgData.tableAble){
          svgData.backImg += '-selected.png';
        }else  if(!svgData.isSelected){
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
        if(svgData.userId && svgData.headImg && !WY.session.isOwner(svgData.userId))
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
          showSale:.3,
        };
        call();
      }
    },
    doSearch:function(){
      this.seatData = '';
      var itemList = [];
      var that = this;
      WY.get('/merchant/seat/data',{
        supplierId:WY.hrefData.supplierId,
        queryDate:this.selectDate,
      } , function(a){
        that.makeBackImg(a.data[0].filter(function(a){return a.supplierFileType==='seat_black'}).pop().filePath , function(){
          a.data[1].forEach(function(d){
            itemList.push(that.makeSvgItem(d));
          });
          that.autoItemList = itemList;
          that.searchStatusList();
        });
      });
    },
    reset:function(){
      WY.ready('set-svg-list',[]);
      var seatItemList = this.seatItemList = [];
      this.autoItemList.forEach(function(a){
        seatItemList.push({
          type:a.type,
          svgData:Object.assign({},a.svgData),
        })
      });
    },
    //查询锁定 最低消费 及线下订桌列表
    searchStatusList:function(){
      this.reset();
      var itemList = this.seatItemList;
      var that = this;
      WY.get('/merchant/seat/statusData',{
        supplierId:WY.hrefData.supplierId,
        startDate:this.selectDate.startTime(),
        endDate:this.selectDate.endTime(),
      },function(a){
        var data = a.data;
        data.forEach(function(statusList , i){
          if(statusList){
            statusList.forEach(function(statusOne){
              if(statusOne){
                var itemOne = itemList.find(function(a){
                  return a.svgData.seatId === statusOne.seatId;
                });
                if(!itemOne)return;
                itemOne = itemOne.svgData;
                if(i === 0){
                  //座位订单
                  that.deSeatOrder(statusOne , itemOne);
                }
                else if(i === 1){
                  //锁定
                  itemOne.selectAble = false;
                }
                else if(i === 2){
                  //最低消费
                  itemOne.lowCostAmount = statusOne.amount;
                }else if(i === 3){
                  //线下订桌
                  itemOne.selectAble = false;
                }else{
                  //拼桌
                  if(o.isAgree ==='y'){
                    itemOne.allGroup++;
                  }
                  //有我的申请
                  if(WY.session.isOwner(statusOne.userId)){
                    if(statusOne.isAgree ==='y'){
                      itemOne.hasMe = 1;
                    }
                    else if(statusOne.isAgree ==='n'){
                      //被拒绝 然后无法选择
                      itemOne.tableAble = false;
                    }else{
                      //正在申请中
                      itemOne.isTableAppling = 1;
                      itemOne.hasMe = 1;
                    }
                  }
                }
              }
            })
          }
        });
        WY.loading(0);
        that.setImg(itemList);
        WY.ready('set-svg-list',itemList);
      });
    },
    //解析订座订单信息
    deSeatOrder:function(orderOne , itemOne){
      if(orderOne){
        //忽略取消
        if(orderOne.status === 'cancel'){
          return false;
        }
        //忽略过期的未支付订单
        if(orderOne.payStatus !== 'ALREADY_PAY'){
          if(new Date(orderOne.expireTime.turnDate()) < Date.now())return false;
        }
        itemOne.isSelected = 1;
        itemOne.allGroup ++;
        itemOne.tableAble = orderOne.payStatus === 'ALREADY_PAY' && orderOne.tableStatus === 'y' && orderOne.pzStatus !== 'end';
        itemOne.userId = orderOne.userId;
        itemOne.orderNo = orderOne.orderNo;
        //是我的订单
        if(WY.session.isOwner(orderOne.userId)){
          itemOne.hasMe = 1;
          itemOne.isMe = 1;
          if(orderOne.payStatus !== 'ALREADY_PAY'){
            var that = this;
            if(!this.hasPayConfirm)WY.confirm({
              cancelText:'买酒',
              submitText:'支付',
              content:'您已有未支付的订座订单！',
              remark:'可前往个人中心取消',
              done:function(v){
                vueRouter.push(v?
                  (
                    WY.common.addUrlParam(that.basePath+'/pay',{
                      seatId:orderOne.seatId,
                      seatOrderNo:orderOne.orderNo,
                      supplierId:orderOne.supplierId,
                      userId:WY.hrefData.userId,
                      token:WY.hrefData.token,
                    })
                  ):(
                    WY.common.addUrlParam(that.basePath+'/product',{
                      seatId:orderOne.seatId,
                      seatOrderNo:orderOne.orderNo,
                      supplierId:orderOne.supplierId,
                      userId:WY.hrefData.userId,
                      token:WY.hrefData.token,
                    })
                  ))
              }
            });
            this.hasPayConfirm = 1;
          }
        }else{
          itemOne.headImg = orderOne.headImg;
          if(!this.hasPing){
            itemOne.selectAble = false;
          }
        }
      }
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
        this.selectDate = selectDate;
        WY.loading(1);
        this.searchStatusList();
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
          userId:WY.hrefData.userId,
          token:WY.hrefData.token,
        }));
        return false;
      }
      if(seatData.allGroup >= 3){
        WY.toast('拼桌人次达到上限');
        return false;
      }
      var data = {
        bookTime:this.selectDate + ' 20:00:00',
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
      WY.loading(1);
      WY.post('/order/seat/'+(data.orderType === 'table'?'pz':'add'),data , function(a){
        WY.loading(0);
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
                userId:WY.hrefData.userId,
                token:WY.hrefData.token,
              }));
            }
            else vueRouter.push( WY.common.addUrlParam(that.basePath +'/product',{
              seatId:data.seatId,
              seatOrderNo:a.data,
              supplierId:data.supplierId,
              userId:WY.hrefData.userId,
              token:WY.hrefData.token,
            }));
          }
        }else{
          WY.toast(a.message);
        }
      });
    },
    scaleChange:function(num){
      WY.trigger('change-svg-scale',num);
    }
  }
}
