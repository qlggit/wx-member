export default{
  name:'h5-wine-manner',
  data() {
    return {
      resData:[
        0,
        {
          name:'傲娇型',
          img: '/images/h5/res-bg-1.png',
        },
        {
          name:'发骚型',
          img: '/images/h5/res-bg-2.png',
        },
        {
          name:'酣睡型',
          img: '/images/h5/res-bg-3.png',
        },
        {
          name:'矫情型',
          img: '/images/h5/res-bg-4.png',
        },
        {
          name:'狂躁型',
          img: '/images/h5/res-bg-5.png',
        },
        {
          name:'撒欢型',
          img: '/images/h5/res-bg-6.png',
        },
        {
          name:'沉稳型',
          img: '/images/h5/res-bg-7.png',
        },
        {
          name:'白痴型',
          img: '/images/h5/res-bg-8.png',
        },
      ],
      userInfo:'',
      mannerRes:0,
      showImgUrl:0,
    }
  },
  beforeDestroy:function(){
    WY.oneUnBind(this);
  },
  created:function(){
    WY.autoVueObj = this;
    function circleImg(ctx, img, x, y, r) {
      ctx.save();
      var d =2 * r;
      var cx = x + r;
      var cy = y + r;
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(img, x, y, d, d);
      ctx.restore();
    }
    var that = this;
    var imgLoad = function ( img ,url, call){
      if(!call){
        call = url;
        img.onload = call;
      }else{
        var xhr = new XMLHttpRequest();
        xhr.open('get',url , true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
          if(xhr.status === 200){
            var blob = xhr.response;
            var newUrl = URL.createObjectURL(blob);
            img.src = newUrl;
            img.onload = call;
          }
        };
        xhr.send();
      }
    }
    var hasInsert;
    WY.oneBind('ele-insert',function(el){
      WY.oneReady('user-info',function(userInfo){
        that.userInfo = userInfo;
        if(hasInsert)return false;
        hasInsert = 1;
        var ctx = el.getContext('2d');
        ctx.clearRect(0,0,750,1210);
        ctx.rect(0,0,750,1210);
        ctx.fillStyle = 'rgb(242,424,242)';
        ctx.fill();
        ctx.beginPath();
        var img = new Image();
        imgLoad(img , that.userInfo.headImg,function(){
          circleImg(ctx, img, 32, 60, 56);
          ctx.beginPath();
          ctx.font="bold 50px Verdana";
          ctx.fillStyle = '#181818';
          ctx.fillText(that.resData[that.mannerRes].name,174,141);
          ctx.stroke();
          ctx.beginPath();
          var img1 = new Image();
          img1.src = that.resData[that.mannerRes].img;
          imgLoad(img1 , function(){
            ctx.drawImage(img1, 0, 0, 696, 437,26,300,696,437);
            ctx.beginPath();
            var img2 = new Image();
            img2.src = '/images/h5/manner-bg.png';
            imgLoad(img2 , function(){
              ctx.drawImage(img2, 0, 0, 755, 416,0,794,755,416);
              ctx.beginPath();
              ctx.rect(0,1210-240,750,212);
              ctx.fillStyle = 'rgba(27,27,31,.08)';
              ctx.fill();
              ctx.beginPath();
              var img3 = new Image();
              img3.src = '/images/h5/erweima.png';
              imgLoad(img3 , function(){
                ctx.drawImage(img3, 0,0, 212, 212,750-26-212, 1210-240,212,212);
                ctx.beginPath();
                ctx.font="30px Verdana";
                ctx.fillStyle = 'rgb(104,104,104)';
                var txt = '撩 玩 嗨 赚 全在手';
                var margin = 10;
                ctx.fillText(txt,26,1210-240+80+margin);
                ctx.fillText('www.yukew.com',26,1210-240+140+margin);
                ctx.stroke();
                ctx.beginPath();
                ctx.fillStyle = 'rgb(104,104,104)';
                ctx.strokeStyle = 'rgb(104,104,104)';
                ctx.moveTo(26,1210-240+90+margin);
                ctx.lineTo(26+ctx.measureText(txt).width,1210-240+90+margin );
                ctx.stroke();
                var imgs = new Image;
                WY.postFile('/file/upload' , {
                  filename:WY.common.convertBase64UrlToBlob(el.toDataURL('image/png'),'image/png'),
                } , function(a){
                  imgs.src = a.data.showUrl;
                  wx.onMenuShareAppMessage({
                    title:'测测你醉酒后的样子吧？',
                    desc:'一起晒晒你喝多了是什么样子吧？',
                    imgUrl:'http://wx.yukew.com/images/logo.png',
                    dataUrl:a.data.showUrl || 'http://wx.yukew.com/images/logo.png',
                    type:'video',
                    link:location.href,
                  });
                  imgs.onload = function(){
                    that.showImgUrl = a.data.showUrl
                    el.remove();
                  }
                })
              })
            })

          })

        });

      },that)
    },this);
    WY.oneReady('wx-ready' , function(){
      wx.onMenuShareTimeline({
        title:'测测你醉酒后的样子吧？',
        link:location.href,
        imgUrl:'http://wx.yukew.com/images/logo.png',
      });
    },this);
    document.title = '长按图片保存分享';
    if(!WY.getCache('wine-manner')){
      vueRouter.push('/h5/wine-manner');
      return false;
    }
    this.mannerRes = WY.getCache('wine-manner-res');
    this.mannerRes = this.mannerRes || (Math.floor(Math.random()*8)+1);
    WY.setCache('wine-manner-res' , this.mannerRes);
    var that = this;
  },
  methods:{
    doRes:function(){
      WY.setCache('wine-manner' , 1);
      vueRouter.push('/')
    }
  }
}
