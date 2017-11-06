<template>
  <div class="page-header back-white text-center">
    <slot name="city-select"></slot>
    <div v-if="!notBack" class="back" v-back ><</div>
    {{title}}
    <slot name="search"></slot>
  </div>
</template>
<script>
  export default {
    props:['headerData'],
    data:function(){
      return {
        title:this.headerData.title,
        notBack:this.headerData.notBack,
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
