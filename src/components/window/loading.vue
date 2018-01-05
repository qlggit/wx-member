<template>
  <div v-show="showAble" class="display-table wy-loading-window z-index-9999">
    <div>
      <canvas v-loading  class="width-20-100"></canvas>
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
      WY.ready('loading',function(sts){
        that.showAble = sts!==0 && sts !==false;
      });
      WY.bind('router-after' , function(){
        that.showAble = false;
      });

    }
  }
</script>
