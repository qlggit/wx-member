export default{
  name:'h5-wine-manner',
  data() {
    return {
      question:[
        {
          title:'一年喝几次酒？',
          selectIndex:null,
          list:[
            {
                key:'A',
                value:'天天',
            },
            {
                key:'B',
                value:'经常',
            },
            {
                key:'C',
                value:'偶尔',
            },
          ]
        },
        {
          title:'平时在哪喝？',
          selectIndex:null,
          list:[
            {
                key:'A',
                value:'酒吧',
            },
            {
                key:'B',
                value:'KTV',
            },
            {
                key:'C',
                value:'其他',
            },
          ]
        },
        {
          title:'喜欢喝什么酒？',
          selectIndex:null,
          list:[
            {
                key:'A',
                value:'白酒',
            },
            {
                key:'B',
                value:'红酒',
            },
            {
                key:'C',
                value:'洋酒',
            },
            {
                key:'D',
                value:'啤酒',
            },
          ]
        },
      ],
      phone:'',
      smsCode:'',
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.setCache('wine-manner' , 0);
    WY.setCache('wine-manner-res' , 0);
    document.title = '测测你的“酒”型人格';
    WY.autoVueObj = this;
    var that = this;
    WY.ready('wx-ready' , function(){
      wx.onMenuShareTimeline({
        title:'测测你醉酒后的样子吧？',
        link:location.href,
        imgUrl:'http://wx.yukew.com/images/logo.png',
      });
      wx.onMenuShareAppMessage({
        title:'测测你的“酒”型人格',
        desc:'测测你醉酒后的样子吧？',
        imgUrl:'http://wx.yukew.com/images/logo.png',
        link:location.href,
      });
    });
  },
  methods:{
    doRes:function(){
      if(!this.question.every(function(a){
        if(a.selectIndex === null){
           return false;
        }
        return true;
        })){
        WY.toast('请先完成问答！');
        return false;
      }
      WY.setCache('wine-manner' , 1);
      vueRouter.push('/h5/wine-manner-res')
    }
  }
}
