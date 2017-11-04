<template>
  <div class="page-header back-white text-center">
    <div class="back" v-back ><</div>
    {{title}}
  </div>
</template>
<script>
  export default {
    props:['title'],
    data:function(){
      return {
        title:this.title
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
