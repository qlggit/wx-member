export default{
  name:'my-order',
  data() {
    return {
      orderList:[
        {
          placeName:'A酒吧',
          status:'B',
          statusName:'待付款',
          price:Math.ceil(20000 * Math.random() | 0),
          address:'A座'
        },
        {
          placeName:'A酒吧',
          status:'B',
          statusName:'已付款',
          price:Math.ceil(20000 * Math.random() | 0),
          address:'A座'
        },
        {
          placeName:'A酒吧',
          status:'B',
          statusName:'已付款',
          price:Math.ceil(20000 * Math.random() | 0),
          address:'A座'
        }
      ],
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
  },
  methods:{
    doSearch:function(){
    },
  }
}
