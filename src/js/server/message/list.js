export default{
  name:'merchant-pay',
  data() {
    return {
      name:'支付',
      showAble:0,
      type:'',
      pageData:[],
      isLastPage:null,
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.loading(1);
    this.name = ({
      act:'活动通知',
      pay:'支付助手',
      wine:'存取酒通知',
      pz:'拼桌通知',
      sys:'系统通知',
    })[this.type = WY.hrefData.type];
    WY.autoVueObj = this;
    this.isServer = location.href.indexOf('server') > 0;
    var that = this;
    WY.oneReady(this.isServer?'token-complete':'user-info',function(o){
      that.doSearch();
    } , this);
    WY.oneBind('scroll-bottom',function(o){
      console.log('scroll-bottom');
      that.showMore();
    } , this);
  },
  methods:{
    showMore:function(){
      if(this.isLastPage===false && this.pageData.length)this.doSearch();
    },
    doSearch:function(seatOrderNo){
      var that = this;
      var url = seatOrderNo?'/order/infoBySeat':'/order/info';
      WY.get(url,{
        orderNo:WY.hrefData.orderNo,
        seatOrderNo:seatOrderNo,
      } , function(a){
        if(a.code === 0){
          that.pageData = that.pageData.concat(a.data && a.data.list || a.data);
        }
        that.isLastPage = a.data.isLastPage;
        that.showAble = 1;
      })
    },
  }
}
