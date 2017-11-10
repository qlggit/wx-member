<template>
  <div class="inline-block city-select-head-title">
    <span @click="locationClick">{{title}}</span>
    <img @click="locationClick" src="/images/page/city-select.png" class="city-select-head-ico" alt="">
    <city-location v-if="showLocation" :selectCity="title"></city-location>
  </div>
</template>
<script>
  export default {
    props:['citySelectData'],
    data:function(){
      return {
        showLocation:false,
        title:this.citySelectData.title,
      };
    },
    beforeDestroy:function(){
      WY.oneUnBind(this);
    },
    created:function(){
      var that = this;
      WY.oneBind('city-location',function(val){
        that.title = val;
        that.showLocation = false;
      } , this);
    },
    methods:{
      locationClick:function(){
        this.showLocation = true;
      }
    }
  }
</script>
