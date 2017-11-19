<template>
  <div v-if="imgInit" class="width-100-100 height-100-100 overflow-hidden back-transparent">
      <svg class="width-100-100 height-100-100 show-svg"
           style="background-size:100% 100%;"
           :style="{
      width:backWidth+'px',
      height:backHeight+'px',
      backgroundImage:'url('+seatData.backSrc+')'
      }"
           :viewBox="[0,0,backWidth,backHeight].join(' ')" ref="showSvg"></svg>
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
        svgObj:'',
        svgInitCount:0,
      }
    },
    beforeDestroy:function(){
      document.body.removeEventListener('touchstart',this.touchstart);
      document.body.removeEventListener('touchmove',this.touchmove);
    },
    created:function(){
      var lastY;
      this.touchmove = function(e){
        var y = e.targetTouches[0].clientY;
        var st = document.scrollingElement.scrollTop;
        if (y >= lastY && st <= 10) {
          e.preventDefault();
        }
        lastY = y;
      };
      this.touchstart = function(e){
        lastY = e.targetTouches[0].clientY;
      };
      document.body.addEventListener('touchstart', this.touchstart);
      document.body.addEventListener('touchmove',this.touchmove);
      this.doInit();
    },
    mounted:function(){
      console.log('mounted');
    },
    updated:function(){
      console.log('updated');
      this.svgInitCount++;
    },
    watch:{
      svgInitCount:function(v){
        if(v === 2){
          this.makeSvgData();
        }
      },
      seatData:function(v , o){
        if(this.svgInitCount >= 2){
          this.makeSvgData();
        }
      },
      'seatData.backSrc':function(v , o){
        if(o){
          this.doInit();
        }
      }
    },
    methods:{
      doInit:function(){
        var img = new Image;
        img.src = this.seatData.backSrc;
        var that = this;
        img.onload = function(){
          that.backWidth = img.width;
          that.backHeight = img.height;
          that.imgInit = 1;
          that.svgInitCount++;
        }
      },
      makeSvgData:function(){
        var that = this;
        if(!this.svgObj){
          this.svgObj = new seatSvg({
            width:this.backWidth,
            height:this.backHeight,
            svg:this.$refs.showSvg,
            itemList:this.seatData.itemList,
            click:function(e , type , data){
              that.$emit('click',e , type , data);
            }
          });
        }else{
          this.svgObj.removeItem();
          this.svgObj.setItemList(this.seatData.itemList);
        }
      }
    }
  }
</script>
