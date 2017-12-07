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
      menuList:[{name:'详情'},{name:'锁定',type:'lock'},{name:'资费','type':'money'},{name:'订桌','type':'book'}],
      userInfo:'',
      showAble:0,
      hasBackImg:0,
      backImg:'',
      seatItemList:'',
      selectSeat:'',
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
  },
  methods:{
    doSubmit:function(type){
      if(!this.selectSeat){
        WY.toast('请先选择一个座位');
        return false;
      }
      var that = this  , sendData;
        sendData = WY.common.copyProp(this.selectSeat,{
          locCount:'',
          lowCostAmount :'',
          seatName  :'',
          yukeSupplierSeatId:'',
        });
        WY.post('/server/merchant/seat/edit',sendData,function(a){
          WY.toast(a.message);
        })
    },
    doSearch:function(){
      var that = this;
      WY.get('/order/seat/list',{
        supplierId:WY.hrefData.supplierId,
        startDate:this.selectDate,
        endDate :this.selectDate,
        pageNum:1,
        pageSize:200,
      } , function(a){
        var seatOrderList = that.seatOrderList = a.data.list;
        if(seatOrderList && seatOrderList.length)that.seatItemList.forEach(function(a){
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
                }
                return false;
              }
              return true;
            })
          }
        })
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
          console.log(count);
          if(a.code === 'back'){
            that.svgBackData = {
              img:a.img,
              backWidth:img.width,
              backHeight:img.height,
            }
          }
          if(count === 0){
            that.hasBackImg = 1;
            console.log('hasBackImg',that.hasBackImg);
            call && call();
          }
        }
      });
    },
    searchBack:function(){
      var that = this;
      WY.get('/merchant/seat/data',
        {supplierId:WY.hrefData.supplierId}
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
              that.seatItemList = itemList;
              setTimeout(function(){
                WY.ready('set-svg-list',itemList);
              },100);
            }
            that.showAble = 1;
          });
        }
      })
    },
    svgClick:function(e , type , data){
      var target = e.target;
      if(this.selectSvg){
        this.selectSvg.style.stroke = 'none';
      }
      if(type === 'svg'){
        return false;
      }
      target.style.stoke = 'red';
      this.lockList = [];
      this.moneyList = [];
      this.bookList = [];
      this.selectSvg = target;
      this.selectSeat = data;
      this.showThisWindow = 1;
      if(this.menuIndex !== 0){
        this.searchMoneyList(this.menuList[this.menuIndex].type , this.menuIndex);
      }
    },
    searchOneList:function(type , index){
      var that = this;
      this.menuIndex = index;
      if(that[type + 'List'].length)return false;
      WY.get('/server/merchant/seat/'+type+'/list',{
        supplierId:WY.hrefData.supplierId,
        seatId:this.selectSeat.seatId,
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
          svgData.backImg = '/images/seat/table-'+color+'-able.png';
          svgData.type = 'room';
          svgData.locCount = svgData.locCount || 8;
          svgData.lowCostAmount = svgData.lowCostAmount || 1000;
          svgData.seatName  = svgData.seatName || '座位';
          svgData.seatShape   = color;
          svgData.seatType    = 'seat';
          svgData.seatTypeName  = '座位';
          break;
        case 0:
          data.type = 'table';
          svgData.backImg = '/images/seat/room-'+color+'-able.png';
          svgData.type = 'table';
          svgData.locCount = svgData.locCount || 15;
          svgData.lowCostAmount = svgData.lowCostAmount || 2000;
          svgData.seatName  = svgData.seatName || '包间';
          svgData.seatShape   = color;
          svgData.seatType    = 'room';
          svgData.seatTypeName    = '包间';
          break;
      }
      svgData.x = svgData.seatX  = offset.left;
      svgData.y = svgData.seatY = offset.top;
      svgData.width = offset.width;
      svgData.height = offset.height;
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
    }
  },
  watch:{
    autoDate:function(v , o){
      if(o){
        this.doSearch();
      }
    }
  }
}
