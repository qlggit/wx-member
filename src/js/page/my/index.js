export default{
  name:'my-index',
  data() {
    return {
      userInfo:'',
      myList:[
        {
          name:'存取酒',
          code:'wine',
          ico:'/images/my/access.png',
          url:'/my/wine'
        },
        {
          name:'我的订座',
          code:'seat',
          ico:'/images/my/seat.png',
          url:'/my/seat'
        },
        {
          name:'我的订单',
          code:'order',
          ico:'/images/my/order.png',
          url:'/my/order'
        },
      ]
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
    WY.oneReady('user-info',function(o){
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
