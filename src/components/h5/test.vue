<template>
  <div>
    div1
    <div>a{{a}}</div>
    <div>b{{b}}</div>
    <div>c{{c}}</div>
    <div>c{{c.c}}</div>
  </div>
</template>
<script>
  export default {
    data:function(){
      return {
        a:1,
        b:2,
      }
    },
    created:function(){
      window.thisVueObj = this;
    }
  }
</script>
