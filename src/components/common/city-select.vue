<template>
  <div class="inline-block city-select-head-title">
    <span>{{title}}</span>
    <img src="/images/page/city-select.png" class="city-select-head-ico" alt="">
  </div>
</template>
<script>
  export default {
    props:['citySelectData'],
    data:function(){
      return {
        title:this.citySelectData.title,
      };
    },
    beforeDestroy:function(){
    },
    created:function(){
    },
    methods:{
    }
  }
</script>
