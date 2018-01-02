<template>
  <div v-show="showAble" class="share-view text-center position-fixed top-0 right-0 z-index-9999">
    <img src="/images/share.png">
    <span class="position-absolute left-0 fz-12 inline-block width-100-100">点这里转发分享</span>
  </div>
</template>
<script>
  export default {
    data:function(){
      return {
        showAble:false
      };
    },
    created:function(){
      var that = this;
      var timer;
      WY.bind('share',function(){
        clearTimeout(timer);
        that.showAble = true;
        timer = setTimeout(function(){
          that.showAble = false;
        } , 1500);
      });
      WY.bind('router-after' , function(){
        that.showAble = false;
      });
    }
  }
</script>
