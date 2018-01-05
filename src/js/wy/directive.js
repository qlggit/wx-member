import Vue from 'vue'
Vue.directive('share',{
  inserted:function(el){
    el.onclick = function(event){
      console.log('click share');
      event.stopPropagation();
      WY.share();
    }
  }
});
Vue.directive('back',{
  inserted:function(el,binding ){
    var url = binding.value;
    el.onclick = function(event){
      event.stopPropagation();
      if(/^\w\:/.test(url)){
        location.href = url;
      }
      else if(url){
        vueRouter.push(url);
      }else{
        vueRouter.go(-1);
      }
    }
  }
});
Vue.directive('user-info',{
  inserted:function(el , binding){
    var userId = binding.value;
    el.onclick = function(event){
      var url = '/user';
      if(!WY.session.isOwner(userId)){
        url += '?uid='+userId;
      }
      vueRouter.push(url);
      event.stopPropagation();
    }
  }
});
Vue.directive('merchant-detail',{
  inserted:function(el , binding){
    var merchantId = binding.value;
    el.onclick = function(event){
      var url = '/merchant/detail?merchantId='+merchantId;
      vueRouter.push(url);
      event.stopPropagation();
    }
  }
});
var scrollTopEle = {

};
Vue.directive('scroll-top',{
  inserted:function(el , binding){
    scrollTopEle[binding.value] = el;
    el.scrollKey = binding.value;
    WY.bind('scroll-top',function(key,v){
      var parentEle = scrollTopEle[key];
      var ele  = parentEle.querySelector('[first-spell='+v+']');
      parentEle.scrollTop = ele.offsetTop - parentEle.firstElementChild.offsetTop;
    });
    el.onscroll = function(e){
      var that = this;
      var firstSpell;
      [].slice.call(that.querySelectorAll('[first-spell]')).every(function(a){
          if(that.scrollTop - that.firstElementChild.offsetTop + a.offsetTop > 0){
            firstSpell = a.getAttribute('first-spell');
            return true;
          }
          return false;
      });
      WY.trigger('scroll-top-key' , firstSpell || 'A' , that.scrollKey);
    }
  },
  unbind:function(el , binding){
    delete scrollTopEle[binding.value];
  }
});
Vue.directive('book-seat',{
  inserted:function(el , binding){
    var data =  binding.value;
    var merchantId = data.merchantId;
    var isServer = data.isServer;
    el.onclick = function(event){
      var url = '/merchant/book?merchantId='+merchantId;
      if(isServer){
        url = WY.common.addUrlParam('/server/app/book',WY.hrefData)
      }
      vueRouter.push(url);
      event.stopPropagation();
    }
  }
});
Vue.directive('router-link',{
  inserted:function(el , binding){
    var url = binding.value;
    var modifiers = binding.modifiers;
    el.onclick = function(event){
      if(url){
        if(modifiers.url || /^(\w+\.?)+\:/.test(url)){
          location.href = url;
        }
        else vueRouter.push(url);
      }
      event.stopPropagation();
    }
  }
});
import smsTimer from '../ui/sms-timer';
Vue.directive('sms-send',{
  update:function(el , binding){
    el.isSmsSending = 0;
    el.onclick = function(event){
      if(!el.isSmsSending){
        var arg = binding.arg || 'BINDING';
        var phone = binding.value ;
        if(!phone || !/^1\d{10}$/.test(phone)){
          WY.toast('请输入有效的手机号');
            return false;
        }
        WY.post('/sms/send',{
          sendType:arg,
          phone:phone
        },function(a){
          if(a.code === 0){
            el.isSmsSending = 1;
            el.smsTimer = smsTimer(el , 60 , function(){
              el.isSmsSending = 0;
            });
          }else{
            WY.toast(a.message);
          }
        });
      }
      event.stopPropagation();
    }
  },
  unbind:function(el){
    el.smsTimer && el.smsTimer.die();
  }
});
Vue.directive('scan-code',{
  update:function(el , binding){
    var needResult = binding.value;
    el.onclick = function(event){
      wx.scanQRCode({
        needResult: needResult || 0,
        scanType: ["qrCode","barCode"],
        success: function (res) {

        }
      });
      event.stopPropagation();
    }
  }
});

Vue.directive('scroll-box',{
  inserted:function(el , binding){
    el.onscroll = function(event){
      if(Math.abs(this.scrollTop + this.clientHeight - this.scrollHeight)  < 10){
        WY.trigger('scroll-bottom' , el , binding);
      }
    }
  }
  ,unbind:function(el){
    el.ontouchmove = null;
    el.ontouchstart = null;
  }
});
Vue.directive('diff-time',{
  inserted:function(el , binding){
    var time = binding.value ;
    var speed = 500;
    el.diffTimer = setInterval(function(){
      time -= speed;
      el.innerHTML = WY.common.sumTime(time);
    } , speed);
  },unbind:function(el){
    clearInterval(el.diffTimer);
  }
});
Vue.directive('ele-insert',{
  inserted:function(el , binding){
    WY.trigger('ele-insert',el , binding);
  }
});
Vue.directive('loading',{
  inserted:function(el , binding){
    var width = 190,height = 65;
    function canvasLoading(canvas){
      canvas.width = width;
      canvas.height = height;
      var x = 67 , y = 94;
      var ctx = canvas.getContext('2d');
      var requestAnimationFrame = window.requestAnimationFrame || function(func){setTimeout(func , 16)};
      var start = 0;
      var startColor = '#ff0042',endColor = 'black';
      function createLinearGradient(){
        var grd=ctx.createLinearGradient(-width/2,0,width*3/2,width);
        grd.addColorStop((start)%1,startColor);
        grd.addColorStop((start+1/12)%1,startColor);
        grd.addColorStop((start+3/12)%1,endColor);
        grd.addColorStop((start+4/12)%1,endColor);
        grd.addColorStop((start+6/12)%1,startColor);
        grd.addColorStop((start+7/12)%1,startColor);
        grd.addColorStop((start+9/12)%1,endColor);
        grd.addColorStop((start+10/12)%1,endColor);
        grd.addColorStop((start+1)%1,startColor);
        return grd;
      }
      function draw(){
        ctx.clearRect(0,0,width,height);
        ctx.beginPath();
        ctx.strokeStyle = createLinearGradient();
        ctx.lineWidth = 3;
        ctx.moveTo(0,height/2);
        ctx.quadraticCurveTo(x,y,width,0);
        ctx.stroke();
        ctx.moveTo(0,height/2);
        ctx.quadraticCurveTo(x,height-y,width,height);
        ctx.stroke();
        start+=0.01;
        if(start>1)start-=1;
        requestAnimationFrame(function(){
          draw();
        });
      }
      draw();
    }
    canvasLoading(el);
  }
});

Vue.directive('open-location',{
  inserted:function(el , binding){
    el.onclick = function(){
      WY.openLocation(binding.value);
    }
  }
});
