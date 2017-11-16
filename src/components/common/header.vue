<template>
  <div class="page-header back-white ">
    <slot name="city-select"></slot>
    <slot name="back"></slot>
    <div v-if="!notBack" class="back" v-back="headerData.backUrl" ></div>
    <div  class="text-center" v-if="!notTitle">{{headerData.title}}</div>
    <slot name="searchInput"></slot>
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
        notTitle:this.headerData.notTitle,
      };
    },
    beforeDestroy:function(){
    },
    created:function(){
    },
    methods:{
    },
    watch:{
      title:function(v){
        console.log('title change to ' + v);
      }
    }
  }
</script>
