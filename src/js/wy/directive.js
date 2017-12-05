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
    var merchantId = binding.value;
    el.onclick = function(event){
      var url = '/merchant/book?merchantId='+merchantId;
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
          if(a.code == 0){
            el.isSmsSending = 1;
            smsTimer(el , 60 , function(){
              el.isSmsSending = 0;
            });
          }else{
            WY.toast(a.message);
          }
        });
      }
      event.stopPropagation();
    }
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
