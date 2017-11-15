<template>
  <div class="width-100-100 height-100-100 overflow-scroll">
    <div v-if="imgInit" :style="{
      width:backWidth+'px',
      height:backHeight+'px',
      background:'url('+seatData.backSrc+')',
    }">
      <svg class="width-100-100 height-100-100 show-svg" @click="svgClick"></svg>
    </div>
  </div>
</template>
<script>
  import seatSvg from '../../js/ui/svg';
  export default {
    props:['seatData'],
    data(){
      return {
        seatData:this.seatData,
        imgInit:0,
        backWidth:0,
        backHeight:0,
        svgObj:''
      }
    },
    created:function(){
      var svg = WY.$('.show-svg')[0];
      var img = new Image;
      img.src = this.seatData.backSrc;
      var that = this;
      img.onload = function(){
        that.backWidth = img.width;
        that.backHeight = img.height;
        that.imgInit = 1;
        that.svgObj = new seatSvg({
          svg:svg,
          itemList:that.seatData.itemList
        });
      }
    },
    methods:{
      svgClick:function(e){
          this.$emit('click',e)
      }
    }
  }
</script>
