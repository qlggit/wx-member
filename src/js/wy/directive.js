import Vue from 'vue'
Vue.directive('share',{
  inserted:function(el){
    console.log('directive share');
    el.onclick = function(event){
      console.log('click share');
      event.stopPropagation();
      WY.share();
    }
  }
});
Vue.directive('back',{
  inserted:function(el){
    console.log('directive back');
    el.onclick = function(event){
      console.log('click back');
      event.stopPropagation();
      vueRouter.go(-1);
    }
  }
});
Vue.directive('user-info',{
  update:function(el , binding){
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
