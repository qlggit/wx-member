export default{
  name:'merchant-book',
  data() {
    return {
      footerList:[
        {
          name:'可选',
          img:'/images/merchant/book-sts-1.png'
        },
        {
          name:'已选',
          img:'/images/merchant/book-sts-2.png'
        },
        {
          name:'锁定',
          img:'/images/merchant/book-sts-3.png'
        },
        {
          name:'拼桌',
          img:'/images/merchant/book-sts-4.png'
        },
      ],
      number:1,
      showThisWindow:false,
      name:'',
      tableAble:1,
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    var that = this;
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
    }
  }
}
