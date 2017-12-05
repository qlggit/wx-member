<template>
  <div class="">
    <canvas :height="height" :width="clientWidth" v-marquee="{
          list:list,
          itemWidth:itemWidth,
          itemHeight:itemHeight,
          height:height,
          margin:margin,
          fontSize:fontSize,
          color:color,
          clientWidth:clientWidth
    }"></canvas>
  </div>
</template>
<script>
  export default {
    props:['marqueeData'],
    data:function(){
      return {
        list:this.marqueeData.list,
        itemWidth:WY.getScaleSize(this.marqueeData.itemWidth),
        itemHeight:WY.getScaleSize(this.marqueeData.itemHeight),
        height:WY.getScaleSize(this.marqueeData.height),
        margin:WY.getScaleSize(this.marqueeData.margin),
        fontSize:WY.getScaleSize(this.marqueeData.fontSize),
        color:this.marqueeData.color,
        clientWidth:WY.clientWidth - WY.getScaleSize(48)
      };
    },
    beforeDestroy:function(){
    },
    created:function(){
    },
    methods:{
    },
    directives:{
      marquee:{
        inserted:function(canvas , binding){
          var ctx = canvas.getContext('2d');
          var startLeft = 0;
          var value = binding.value;
          var marqueeImgObject = [];
          var itemWidth = value.itemWidth;
          var itemHeight = value.itemHeight;
          var clientWidth = value.clientWidth;
          var height = value.height;
          var margin = value.margin;
          var fontSize = value.fontSize;
          if(value.list.length < 4){
            value.list = value.list.concat(value.list,value.list,value.list).slice(0,4);
          }
          value.list.forEach(function(a){
            var img = new Image;
            img.src = a.filePath;
            img.onload = function(){
              img.showTitle = a.name || '活动名称';
              marqueeImgObject.push(img);
              if(marqueeImgObject.length ===  value.list.length){
                canvasAnimate();
              }
            }
          });
          function drawCanvas(){
            drawOne();
            if(startLeft >= itemWidth + margin){
              marqueeImgObject.push(marqueeImgObject.shift());
              startLeft = 0;
            }
            else {
              startLeft++
            }
            requestAnimationFrame(function(){
              if(!isStopCanvasAnimate)drawCanvas();
            })
          }
          function drawOne(){
            ctx.beginPath();
            ctx.clearRect(0,0,clientWidth,height);
            marqueeImgObject.forEach(function(a,i){
              ctx.drawImage(a,0,0,a.width,a.height,i * (itemWidth + margin) - startLeft,0,itemWidth ,itemHeight);
              if(!a.isHover){
                ctx.beginPath();
                ctx.fillStyle = 'rgba(0,0,0,.1)';
                ctx.fillRect(i * (itemWidth + margin) - startLeft,0,itemWidth ,itemHeight);
              }
              if(a.showTitle){
                ctx.beginPath();
                ctx.fillStyle = '#131313';
                ctx.font = fontSize + 'px Arial';
                var fontWidth = ctx.measureText(a.showTitle).width;
                ctx.fillText(a.showTitle,i * (itemWidth + margin) - startLeft + (itemWidth - fontWidth) / 2,height);
              }
            });
          }
          $(canvas).bind('mouseenter touchstart',function(){
            stopCanvasAnimate();
          });
          function clearHover(){
            marqueeImgObject.forEach(function(a){
              a.isHover = false;
            })
          }
          $(canvas).bind('mousemove touchmove',function(e){
            isStopCanvasAnimate = true;
            var left = e.pageX;
            left += startLeft;
            marqueeImgObject.forEach(function(a , i){
              a.isHover = false;
              if(left > i * itemWidth && left < (i+1)*(itemWidth + margin) - margin){
                a.isHover = true;
              }
            });
            drawOne();
          });
          $(canvas).bind('mouseleave touchcancel touchend',function(){
            clearHover();
            canvasAnimate();
          });
          var isStopCanvasAnimate;
          function stopCanvasAnimate(){
            isStopCanvasAnimate = true;
          }
          function canvasAnimate(){
            isStopCanvasAnimate = false;
            drawCanvas();
          }
        }
      }
    }
  }
</script>
