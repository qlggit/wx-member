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
      for(var i=0;i<7;i++){
        seatItemList.push({
          type:['table','room','chair'].sort(function(){return .5-Math.random()}).pop(),
          svgData:{
            width:100,
            height:100,
            x:Math.random()*1180,
            y:Math.random()*808,
            status:'',
            seatId:'',
            seatName:'ABCEDFGE'.split('').sort(function(){return .5-Math.random()}).pop()+'区的',
            minConsume:Math.ceil(Math.random()*10)*1000,
            maxNumber:Math.ceil(Math.random()*15),
            isSelected:[0,1].sort(function(){return .5-Math.random()}).pop(),
            selectAble:[0,1].sort(function(){return .5-Math.random()}).pop(),
            isMe:[0,1].sort(function(){return .5-Math.random()}).pop(),
            hasMe:[0,1].sort(function(){return .5-Math.random()}).pop(),
            tableAble:[0,1].sort(function(){return .5-Math.random()}).pop(),
            allNumber:Math.ceil(Math.random()*10),
            allGroup:Math.ceil(Math.random()*3),
            myNumber:1,
            addAble:1,
          }
        })
      }
    },
    svgClick:function(e , type , data){
      if(type === 'svg'){
        return false;
      }
      if(data.isMe)data.hasMe = 1;
      if(data.hasMe)data.isSelected = 1;
      if(data.isSelected)data.selectAble = 1;
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
    }
  },
  watch:{
    selectDate:function(v , o){
      if(o)this.doSearch();
    }
  }
}
