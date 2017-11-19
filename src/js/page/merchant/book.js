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
      seatData:'',
      dateVisible:'',
      seatItemList:[],
      toBuyWine:1
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
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
    doSearch:function(){
      this.seatData = '';
      this.seatItemList.splice(0);
      var seatItemList = this.seatItemList;
      WY.get('/merchant/seat/list',{
        supplierId:WY.hrefData.supplierId,
      } , function(a){
        a.data.forEach(function(d){
          var type = ({
            seat:'table',
            room:'room'
          })[d.seatType];
          var img = '/images/seat/'+({
            table:'table',
            room:'room'
          })[type] + '.png';
          seatItemList.push({
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
              isSelected:d.seatStatus !=='noselected',
              selectAble:d.seatStatus !=='lock',
              isMe:[0,1].sort(function(){return .5-Math.random()}).pop(),
              hasMe:[0,1].sort(function(){return .5-Math.random()}).pop(),
              tableAble:[0,1].sort(function(){return .5-Math.random()}).pop(),
              hadCount:d.hadCount || 0 ,
              allGroup:Math.ceil(Math.random()*3),
              myNumber:1,
              addAble:1,
            }
          })
        });
      });
    },
    svgClick:function(e , type , data){
      if(type === 'svg'){
        return false;
      }
      if(data.isMe)data.hasMe = 1;
      if(data.hasMe)data.isSelected = 1;
      if(data.isSelected)data.selectAble = 1;
      console.log(data);
      this.seatData = data;
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
      var data = {
        bookTime:this.selectDate,
        orderNum:this.seatData.myNumber,
        orderType:this.selectDate.isSelected?'normal':'table',
        seatId:this.seatData.seatId,
        shippingWine:this.toBuyWine,
        supplierId:WY.hrefData.supplierId,
      };
      WY.post('/merchant/seat/add',data , function(a){
        console.log(a);
      });
    }
  },
  watch:{
    selectDate:function(v , o){
      if(o)this.doSearch();
    }
  }
}
