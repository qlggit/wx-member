export default{
  name:'my-index',
  data() {
    return {
      userInfo:'',
      myList:[
        {
          name:'存取酒',
          code:'wine',
          ico:'/images/my/access',
          url:'/my/wine',
          number:0,
        },
        {
          name:'我的订座',
          code:'seat',
          ico:'/images/my/seat',
          url:'/my/seat',
          number:0,
        },
        {
          name:'我的订单',
          code:'order',
          ico:'/images/my/order',
          url:'/my/order',
          number:0,
        },
      ]
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.autoVueObj = this;
    var that = this;
    WY.oneReady('user-info',function(o){
      var str = o.gender === '2'?'-2.png':'-1.png';
      that.myList.forEach(function(a){
         a.ico += str;
      });
      that.userInfo = o;
    } , this);
    this.doSearch();
  },
  methods:{
    doSearch:function(){
      var that = this;
        WY.get('/my/count/data',{},function(a){
          var data = a.data;
          that.myList.forEach(function(b){
            b.number = data[b.code] || 0;
          });
        })
    }
  }
}
