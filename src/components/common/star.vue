<template>
  <div class="inline-block lh-0">
    <img v-for="item in starList" class="star-ico"
         :src="'/images/merchant/star-'+(item>starCount?'empty':(starCount-item === .5)?'some':'full')+'.png'" alt="">
  </div>
</template>
<script>
  export default {
    props:['starCount'],
    data:function(){
      return {
        starList:[1,2,3,4,5],
        starCount:this.starCount
      };
    },
    beforeDestroy:function(){
    },
    created:function(){
    }
  }
</script>
