<template>
    <div v-show="showAble" class="display-table wy-toast-window z-index-9999">
      <div class="text">{{content}}</div>
    </div>
</template>
<script>
  export default {
    data:function(){
      return {
        showAble:false,
        content:''
      };
    },
    created:function(){
      var that = this;
      var toastTimer;
      WY.bind('toast',function(options){
        clearTimeout(toastTimer);
        that.showAble = true;
        that.content = options.content;
        toastTimer = setTimeout(function(){
          that.showAble = false;
          options.done && options.done();
        } , options.delay || 1000);
      });
      WY.bind('router-after' , function(){
        that.showAble = false;
      });
    }
  }
</script>
