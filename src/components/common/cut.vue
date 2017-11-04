<template>
  <div v-if="cutData.cutShow"
       class="position-fixed width-100-100 left-0 top-0  z-index-3333 height-100-100 back-black">
    <img class="width-100-100" :src="cutData.imgPath" @load="cutImageLoad">
    <canvas class="cut-canvas back-236 opacity-0" width="200px" height="200px"></canvas>
    <div class="btn btn-sm color-blue-1 back-white-5 position-absolute z-index-1000 top-0 right-0"
         @click="confirmCutImage">确定</div>
    <div class="btn btn-sm color-999 back-white-5 position-absolute z-index-1000 top-0 left-0"
         @click="cancelCutImage">取消</div>
    <div class="page-back"></div>
    <div v-if="cutData.backShow" class="cut-img position-absolute z-index-100 overflow-hidden"
         :style="{left:left+'px',top:top+'px'}"
         @touchmove="cutImageTouchMove"
         @mousemove="cutImageTouchMove"
         @touchstart="cutImageTouchStart"
         @mousedown="cutImageTouchStart"
         @touchend="cutImageTouchEnd"
         @mouseup="cutImageTouchEnd"
         @mouseout="cutImageTouchEnd"
         @touchcancel="cutImageTouchEnd"
      >
      <img :src="cutData.imgPath"
           class="show-cut-img"
           :style="{
         width:offsetWidth+'px',
         height:offsetHeight+'px',
         'margin-left':-left+'px',
         'margin-top':-top+'px'
         }">
    </div>
  </div>
</template>
<script>
  export default {
    props:['cutData'],
    data:function(){
      return {
        offsetWidth:200,
        offsetHeight:200,
        windowWidth:window.innerWidth,
        windowHeight:window.innerHeight,
        left:10,
        top:10,
        cutData:this.cutData
      };
    },
    methods:{
      confirmCutImage:function(){
        var canvas = $('.cut-canvas')[0];
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = this.cutData.imgPath;
        var that = this;
        img.onload = function(){
          var autoWidth = img.width;
          var scale = that.offsetWidth / autoWidth;
          ctx.drawImage($('.show-cut-img')[0] ,
            that.left/scale,
            that.top/scale,
            200/scale,200/scale,0,0,200,200
          );
          var blob = WY.common.convertBase64UrlToBlob(canvas.toDataURL(),'image/png');
          that.cutData.cutShow = false;
          that.cutData.done(blob);
        }
      },
      cancelCutImage:function(){
        this.left = 10;
        this.top = 10;
        this.cutData.cutShow = false;
      },
      cutImageLoad:function(event){
        var el = event.target;
        this.offsetWidth = el.offsetWidth;
        this.offsetHeight = el.offsetHeight;
        this.cutData.backShow = true;
      },
      cutImageTouchStart:function(event){
        event = event.touches && event.touches[0] || event;
        this.isTouchStart = true;
        this.autoLeft = this.left;
        this.autoTop = this.top;
        this.autoX = event.pageX;
        this.autoY = event.pageY;
      },
      cutImageTouchMove:function(event){
        if(!this.isTouchStart)return false;
        event = event.touches && event.touches[0] || event;
        var _x = event.pageX;
        var _y = event.pageY;
        var left = this.autoLeft + _x - this.autoX;
        if(left < 0){
          left = 0
        }else if(left > this.windowWidth - 200){
          left = this.windowWidth - 200;
        }
        var top = this.autoTop + _y - this.autoY;
        if(top < 0){
          top = 0;
        }else if(top > this.windowHeight - 200){
          top = this.windowHeight - 200;
        }
        this.left = left;
        this.top = top;
      },
      cutImageTouchEnd:function(){
        this.isTouchStart = false;
      }
    }
  }
</script>
