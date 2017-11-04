<template>
  <div v-show="showAble" class="display-table wy-loading-window z-index-9999">
    <div>
      <img src="/images/loading.gif" alt=""/>
    </div>
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
      WY.bind('loading',function(sts){
        that.showAble = sts!==0 && sts !==false;
      });
    }
  }
</script>
