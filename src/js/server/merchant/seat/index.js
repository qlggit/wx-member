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
      menuList:[{name:'详情'},{name:'锁定列表',type:'lock'},{name:'最低消费','type':'money'},{name:'订桌列表','type':'book'}],
      userInfo:'',
      showAble:0,
      hasBackImg:0,
      backImg:'',
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
      changeData:{
        lowCostAmount:'',
        orderNum:'',
        bookPhone:'',
      },
      totalMoney:0
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
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
      this.changeData.orderNum = 1;
      this.changeData.bookPhone = '';
      this.operatorType = type;
      if(type === 'info'){
        this.infoData = {
          seatName:this.selectSeat[0].seatName,
          locCount:this.selectSeat[0].locCount,
          lowCostAmount:this.selectSeat[0].lowCostAmount,
        }
        this.showThisWindow = 1;
        return;
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
      var that = this  , sendData , url;
      var operatorType = this.operatorType;
      var selectSeat = this.selectSeat;
      var seatId = this.selectSeat.map(function(a){return a.yukeSupplierSeatId}).join();
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
          sendData = {
            seatId:seatId,
            startDate:startDate,
            endDate:endDate,
          };
          break;
      }
      sendData.supplierId = WY.hrefData.supplierId;
      WY.post(url , sendData , function(a){
        if(a.code === 0){
          if(operatorType === 'info'){
            if(selectSeat.length === 1){
              selectSeat.seatName = that.infoData.seatName;
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
                  itemOne.lowCostAmount = statusOne.lowCostAmount;
                }else if(i === 3){
                  //线下订桌
                  itemOne.isSelected = 1;
                }else{
                  //拼桌
                  if(o.isAgree ==='y'){
                    itemOne.allGroup++;
                  }
                }
              }
            })
          }
        });
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
          svgData.backImg = svgData.autoBackImg + '-my.png';
        }else if(!svgData.tableAble){
          //不可拼桌的
          svgData.backImg = svgData.autoBackImg + '-selected.png';
        }else if(svgData.isSelected){
          //正在拼桌的
          svgData.backImg = svgData.autoBackImg + '-ping.png';
        }else{
          //空白的
          svgData.backImg = svgData.autoBackImg + '-able.png';
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
    doShowBack:function(call){
      var count = 0;
      var that = this;
      this.backImg.forEach(function(a){
        var img = new Image;
        img.src = a.img;
        count++;
        img.onload = function(){
          count--;
          if(a.code === 'back'){
            that.hasBackImg = 1;
            that.svgBackData = {
              img:a.img,
              backWidth:img.width,
              backHeight:img.height,
            }
          }
          if(count === 0){
            call && call();
          }
        }
      });
    },
    searchBack:function(){
      var that = this;
      WY.get('/merchant/seat/data',
        {
          supplierId:WY.hrefData.supplierId,
        }
        ,function(a){
        if(a.data[0] && a.data[0].length){
          that.backImg = a.data[0].map(function(b,i){
            return {
              code:b.supplierFileType === 'seat_per'?'main':'back',
              img:b.filePath
            };
          });
          that.doShowBack(function(){
            if(a.data[1] && a.data[1].length){
              var itemList = a.data[1].map(function(a){
                return that.makeItem(a.seatShape - 0,{
                  left:a.seatX - 0,
                  top:a.seatY - 0
                } , a);
              });
              that.autoItemList = itemList;
              that.searchStatusList();
            }
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
        startDate:this.nowDate,
      },function(a){
        that[type + 'List'] = a.data && a.data.list || a.data;
      })
    },
    makeItem:function(color , offset , autoData){
      var data = {svgData:autoData || {}};
      var svgData = data.svgData;
      switch (color){
        case 255:
        case 197:
        case 85:
          data.type = 'room';
          svgData.autoBackImg = '/images/seat/table-'+color;
          svgData.type = 'room';
          svgData.locCount = svgData.locCount || 8;
          svgData.seatName  = svgData.seatName || '座位';
          svgData.seatShape   = color;
          svgData.seatType    = 'seat';
          svgData.seatTypeName  = '座位';
          break;
        case 0:
          data.type = 'table';
          svgData.autoBackImg = '/images/seat/room-'+color;
          svgData.type = 'table';
          svgData.locCount = svgData.locCount || 15;
          svgData.seatName  = svgData.seatName || '包间';
          svgData.seatShape   = color;
          svgData.seatType    = 'room';
          svgData.seatTypeName    = '包间';
          break;
      }
      svgData.allGroup = 0;
      svgData.lowCostAmount /= 100;
      svgData.seatId = svgData.seatId || svgData.yukeSupplierSeatId;
      svgData.tableAble = 1;
      svgData.selectAble = svgData.seatStatus !== 'lock';
      svgData.x = svgData.seatX  = offset.left - 0;
      svgData.y = svgData.seatY = offset.top - 0;
      svgData.width = offset.width - 0;
      svgData.height = offset.height - 0;
      svgData.supplierId = WY.hrefData.supplierId;
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
  },
  watch:{
    autoDate:function(v , o){
      if(o){
        this.doSearch();
      }
    }
  }
}
