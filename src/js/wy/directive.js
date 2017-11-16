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
      if(url){
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
    WY.bind('scroll-top',function(key,v){
      var parentEle = scrollTopEle[key];
      var ele  = parentEle.querySelector('[first-spell='+v+']');
      parentEle.scrollTop = ele.offsetTop - parentEle.firstElementChild.offsetTop;
    });
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
    var url = binding.value || 'http://www.baidu.com';
    el.onclick = function(event){
      if(/^(\w+\.?)+\:/.test(url)){
        location.href = url;
      }
      else vueRouter.push(url);
      event.stopPropagation();
    }
  }
});
