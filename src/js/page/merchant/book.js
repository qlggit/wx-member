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
      number:1,
      showThisWindow:false,
      name:'',
      tableAble:1,
      selectDate:'',
      startDate:WY.common.parseDate(new Date , 'Y-m-d'),
      isSelected:0,
      seatName:'',
      dateVisible:'',
      seatItemList:[
        {
          type:'table',

        }
      ]
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    this.selectDate = WY.common.parseDate(new Date,'Y-m-d');
    WY.oneReady('user-info',function(o){
        if(!o || !o.phone){
          //vueRouter.push('/login/phone');
        }
        WY.get('/merchant/detail/data' , function(data){
          data = data.data;
          that.name = data.name;
          console.log(that.name);
        });
    } , this);
  },
  methods:{
    changeNumber:function(data){
      this.number = data.number;
      console.log(this.number);
    },
    showConfirmWindow:function(v){
      this.showThisWindow = v;
    },
    tableChange:function(){
      this.tableAble = !this.tableAble;
    },
    doSelectDate:function(){
      console.log('doSelectDate');
      if(!this.isSelected){
        console.log('dateVisible');
        this.dateVisible = 1;
        console.log(this.dateVisible);
      }
    },
    svgClick:function(e){
      console.log('svgClick');
      console.log(e);
    },
    onValuesChange:function(v1,v2,v3){
      this.selectDate = [v1,v2,v3].join('-');
    }
  }
}
