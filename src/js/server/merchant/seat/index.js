import dateChoose from '@/components/common/date-choose.vue';
export default{
  name:'admin-seat-create',
  components:{
    dateChoose
  },
  data() {
    return {
      showThisWindow:0,
      menuIndex:0,
      seatStatusList:[
        {
          name:'空位',
          img:'/images/merchant/book-sts-empty.png'
        },
        {
          name:'锁定',
          img:'/images/merchant/book-sts-lock.png'
        },
        {
          name:'拼桌',
          img:'/images/merchant/book-sts-ping.png'
        },
        {
          name:'已订',
          img:'/images/merchant/book-sts-fill.png'
        }
      ],
      menuList:[{name:'详情'},{name:'锁定列表',type:'lock'},{name:'最低消费','type':'money'},{name:'订桌列表','type':'book'}],
      userInfo:'',
      showAble:0,
      hasBackImg:0,
      seatItemList:'',
      selectSeat:[],
      nowDate:'',
      dateVisible:'',
      lockList:[],
      moneyList:[],
      bookList:[],
      chooseDateData:'',
      autoDate:'',
      chooseDateType:0,
      chooseStartDate:'',
      chooseEndDate:'',
      bookDate:'',
      bookNum:1,
      bookPhone:'',
      orderNum:0,
      seatOrderList:'',
      orderList:'',
      showOperatorWindow:0,
      operatorType:'',
      infoData:'',
      countData:{
        orderNum:0,
        orderAmount:0,
      },
      changeData:{
        lowCostAmount:'',
        customerNum :'',
        customerPhone :'',
        customerName:'',
        remark:'',
      },
      totalMoney:0,
      maxSeatHeight:0,
      autoItemList:[],
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.loading(1);
    WY.autoVueObj = this;
    var that = this;
    this.maxSeatHeight = WY.clientHeight - WY.getScaleSize(1040);
    if(this.maxSeatHeight < 100)this.maxSeatHeight = 100;
    this.chooseStartDate = this.chooseEndDate = this.bookDate = this.autoDate = this.nowDate = WY.common.parseDate(new Date , 'Y-m-d');
    this.chooseDateData = {startDate:this.nowDate,selectDate:this.nowDate,title:'请选择日期'};
    WY.oneReady('user-info',function(o){
      that.userInfo = o;
    } , this);
    this.searchBack();
    //svg 显示完成
    WY.oneBind('svg-show-complete',function(){
      that.setUserInfo();
    } , this);
  },
  methods:{
    showOperator:function(type){
      this.menuIndex = 0;
      this.changeData.customerNum = 1;
      this.changeData.customerPhone = '';
      this.changeData.customerName = '';
      this.changeData.remark = '';
      this.operatorType = type;
      if(type === 'info'){
        this.infoData = {
          seatName:this.selectSeat[0].seatName,
          locCount:this.selectSeat[0].locCount,
          lowCostAmount:this.selectSeat[0].lowCostAmount,
        };
        this.showThisWindow = 1;
        return;
      }
      if(this.selectSeat.length === 1){
        this.changeData.lowCostAmount = this.selectSeat[0].lowCostAmount;
      }
      this.operatorTypeName = ({
        book:'订桌',
        amount:'最低消费',
        lock:'锁定',
      })[type];
      this.showOperatorWindow = 1;
    },
    doSubmit:function(){
      if(!this.selectSeat || !this.selectSeat.length){
        WY.toast('请先选择一个座位');
        return false;
      }
      WY.loading(1);
      var that = this  , sendData , url;
      var operatorType = this.operatorType;
      var selectSeat = this.selectSeat;
      var seatId = this.selectSeat.map(function(a){return a.seatId}).join();
      var startDate,endDate;
      if(this.chooseDateType === 0){
        startDate = this.nowDate.startTime();
        endDate = this.nowDate.endTime();
      }
      else if(this.chooseDateType === 1){
        startDate = WY.common.parseDate( Date.now() + 24 * 3600 * 1000 , 'Y-m-d').startTime();
        endDate = WY.common.parseDate( Date.now() + 24 * 3600 * 1000 , 'Y-m-d').endTime();
      }else{
        startDate = this.chooseStartDate.startTime();
        endDate = this.chooseEndDate.endTime();
      }
      switch (operatorType){
        case 'info':
          url = '/server/merchant/seat/edit';
          sendData = WY.common.copyProp(this.infoData,{
            locCount:'',
            lowCostAmount :'',
            seatName  :'',
          });
          sendData.yukeSupplierSeatId = seatId;
          sendData.lowCostAmount *= 100;
          break;
        case 'lock':
          url = '/server/merchant/seat/lock';
          sendData = {
            seatId:seatId,
            startDate:startDate,
            endDate:endDate,
          };
          break;
        case 'money':
          url = '/server/merchant/seat/money';
          sendData = {
            seatId:seatId,
            startDate:startDate,
            endDate:endDate,
          };
          sendData.lowCostAmount = this.changeData.lowCostAmount * 100;
          break;
        case 'book':
          url = '/server/merchant/seat/book';
          sendData = WY.common.copyProp(this.changeData,{
            customerName :'',
            customerNum  :'',
            customerPhone   :'',
            remark    :'',
          });
          sendData.bookTime = this.chooseStartDate.startTime(' 20:00:00');
          sendData.seatId  = seatId ;
          break;
      }
      sendData.supplierId = WY.hrefData.supplierId;
      WY.post(url , sendData , function(a){
        WY.loading(0);
        if(a.code === 0){
          if(that[operatorType + 'List']){
            that[operatorType + 'List'] = [];
          }
          if(operatorType === 'info'){
            if(selectSeat.length === 1){
              selectSeat[0].seatName = that.infoData.seatName;
            }
            selectSeat.forEach(function(a){
              a.locCount = that.infoData.locCount;
              a.lowCostAmount = that.infoData.lowCostAmount;
            })
          }
        }
        WY.toast(a.message);
      })
    },
    searchOrder:function(){
      var that = this;
      WY.get('/order/list',{
        supplierId:WY.hrefData.supplierId,
        startDate:this.autoDate.startTime(),
        endDate :this.autoDate.endTime(),
        pageNum:1,
        pageSize:200,
      } , function(a){
        var orderList = that.orderList =  a.data.list;
        if(orderList && orderList.length){
          that.seatItemList.forEach(function(a){
            var thisList = orderList.filter(function(b){
              return a.seatId === b.seatId;
            });
            if(thisList && thisList.length){
              a.orderLength = thisList.length;
              a.totalAmount = WY.common.sum(thisList , function(a){return a.orderMoney});
              that.totalMoney += a.totalAmount || 0;
            }
          });
        }
      });
    },
    reset:function(){
      WY.ready('set-svg-list',[]);
      this.totalMoney = 0;
      this.orderNum = 0;
      var seatItemList = this.seatItemList = [];
      this.autoItemList.forEach(function(a){
        seatItemList.push({
          type:a.type,
          svgData:Object.assign({},a.svgData),
        })
      });
    },
    searchStatusList:function(){
      this.reset();
      this.searchOrder();
      var itemList = this.seatItemList;
      var that = this;
      WY.get('/merchant/seat/statusData',{
        supplierId:WY.hrefData.supplierId,
        startDate:this.autoDate.startTime(),
        endDate:this.autoDate.endTime(),
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
                  itemOne.lowCostAmount = statusOne.amount / 100;
                }else if(i === 3){
                  //线下订桌
                  itemOne.isSelected = 1;
                }else{
                  //拼桌
                  if(statusOne.isAgree ==='y'){
                    itemOne.allGroup++;
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
        itemOne.isSelected = 1;
        itemOne.allGroup ++;
        itemOne.tableAble = orderOne.payStatus === 'ALREADY_PAY' && orderOne.tableStatus === 'y' && orderOne.pzStatus !== 'end';
        itemOne.userId = orderOne.userId;
        itemOne.orderNo = orderOne.orderNo;
        this.orderNum += orderOne.orderNum;
        itemOne.headImg = orderOne.headImg;
      }
    },
    setImg:function(list){
      list.forEach(function(data){
        var svgData = data.svgData;
        //被锁定的
        if(!svgData.selectAble && !svgData.isSelected){
          svgData.backImg += '-selected.png';
        }else if(!svgData.tableAble){
          //不可拼桌的
          svgData.backImg += '-my.png';
        }else if(svgData.isSelected){
          //正在拼桌的
          svgData.backImg += '-ping.png';
        }else{
          //空白的
          svgData.backImg += '-able.png';
        }
      })
    },
    setUserInfo:function(){
      //显示座位上的人头像
      if(this.seatItemList)this.seatItemList.forEach(function(data){
        var svgData = data.svgData;
        if(svgData.headImg && svgData.userId)
          WY.trigger('set-user-head-img', svgData , {
            userId:svgData.userId,
            headImg:svgData.headImg,
            done:function(headImgSvg , svgData){
              headImgSvg.onclick = function(){
                //WY.trigger('show-user-info' , svgData.userId);
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
    searchBack:function(){
      var that = this;
      WY.ready('set-svg-list',[]);
      WY.get('/merchant/seat/data',
        {
          supplierId:WY.hrefData.supplierId,
          queryDate:this.autoDate,
        }
        ,function(a){
        if(a.data[0] && a.data[0].length){
          var itemList = [];
          that.makeBackImg(a.data[0].filter(function(a){return a.supplierFileType==='seat_black'}).pop().filePath , function(){
            a.data[1].forEach(function(d){
              itemList.push(that.makeSvgItem(d));
            });
            that.autoItemList = itemList;
            that.searchStatusList();
            that.showAble = 1;
          });
        }
      })
    },
    selectAllSeat:function(){
      var selectSeat = this.selectSeat;
      this.seatItemList.forEach(function(a){
        if(selectSeat.indexOf(a.svgData) === -1){
          WY.trigger('set-svg-selected',a.svgData);
          selectSeat.push(a.svgData);
        }
      });
    },
    selectOtherSeat:function(){
      var selectSeat = this.selectSeat;
      var newList = [];
      this.seatItemList.forEach(function(a){
        if(selectSeat.indexOf(a.svgData) === -1){
          WY.trigger('set-svg-selected',a.svgData);
          newList.push(a.svgData);
        }
      });
      selectSeat.forEach(function(a){
        WY.trigger('clear-svg-selected',a);
      });
      this.selectSeat = newList;
    },
    svgClick:function(e , type , data){
      console.log(data);
      if(type === 'svg'){
        return false;
      }
      var index = this.selectSeat.indexOf(data);
      if(index > -1){
        WY.trigger('clear-svg-selected',data);
        this.selectSeat.splice(index , 1);
        return false;
      }
      WY.trigger('set-svg-selected',data);
      this.lockList = [];
      this.moneyList = [];
      this.bookList = [];
      this.selectSeat.push(data) ;
    },
    clearSeat:function(index){
      if(index === undefined){
        this.selectSeat.forEach(function(a){
          WY.trigger('clear-svg-selected',a);
        });
        this.selectSeat = [];
      }
      else{
        WY.trigger('clear-svg-selected',this.selectSeat[index]);
        this.selectSeat.splice(index , 1);
      }
    },
    searchOneList:function(type , index){
      var that = this;
      this.menuIndex = index;
      if(!type)return false;
      if(that[type + 'List'] && that[type + 'List'].length)return false;
      WY.get('/server/merchant/seat/'+type+'/list',{
        supplierId:WY.hrefData.supplierId,
        seatId:this.selectSeat[0].seatId,
        startDate:this.nowDate.startTime(),
      },function(a){
        that[type + 'List'] = a.data && a.data.list || a.data;
      })
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
          seatTypeName:d.seatType==='seat'?'桌子':'包房',
          x:d.seatX - 0,
          y:d.seatY - 0,
          seatStatus :d.seatStatus ,
          seatId:d.yukeSupplierSeatId || a.seatId,
          orderNo:d.orderNo,
          seatShape:d.seatShape,
          seatName:d.seatName ,
          lowCostAmount:d.lowCostAmount / 100,
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
    onValuesChange:function(v){
      this[this.selectDateType] = v.join('-');
    },
    doSelectDate:function(type , v){
      this.chooseDateData.selectDate = this[type];
      this.selectDateType = type;
      this.dateVisible = 1;
    },
    delOne:function(type , item){
      var that = this;
      WY.post('/server/merchant/seat/'+type+'Cancel',{
        supplierId:item.supplierId,
        seatId:item.seatId,
        ordersOfflineId:item.ordersOfflineId,
        startDate:WY.common.parseDate(item.setTime,'Y-m-d 00:00:00'),
        endDate:WY.common.parseDate(item.setTime,'Y-m-d 23:59:59'),
        setType :'part',
        lockType :'part',
      },function(a){
        WY.toast(a.message);
        if(a.code === 0){
          that[type + 'List'] = [];
          that.searchOneList(type , that.menuIndex);
        }
      });
    }
  },
  watch:{
    autoDate:function(v , o){
      if(o){
        WY.loading(1);
        this.searchStatusList();
      }
    }
  }
}
