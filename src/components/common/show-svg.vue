<template>
  <div class="width-100-100 height-100-100 overflow-hidden back-transparent cursor-pointer">
      <svg class="width-100-100 height-100-100 show-svg"
           style="background-size:100% 100%;"
           :style="{
      width:svgBackData.backWidth+'px',
      height:svgBackData.backHeight+'px',
      backgroundImage:'url('+svgBackData.img+')'
      }"
           :viewBox="[0,0,svgBackData.backWidth,svgBackData.backHeight].join(' ')" ref="showSvg"></svg>
  </div>
</template>
<script>
  import seatSvg from '../../js/ui/svg';
  export default {
    props:['svgBackData'],
    data(){
      return {
        svgBackData:this.svgBackData,
        itemList:'',
        svgObj:'',
        svgInitCount:0,
        isSetReady:0,
      }
    },
    beforeDestroy:function(){
      document.body.removeEventListener('touchstart',this.touchstart);
      document.body.removeEventListener('touchmove',this.touchmove);
      WY.oneUnBind(this);
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
      var that = this;
      WY.oneReady('set-svg-list',function(itemList){
        that.itemList = itemList;
        that.makeSvgData();
      } , this);
    },
    methods:{
      makeSvgData:function(){
        var that = this;
        if(!this.svgObj){
          this.svgObj = new seatSvg({
            width:this.svgBackData.backWidth,
            height:this.svgBackData.backHeight,
            svg:this.$refs.showSvg,
            itemList:this.itemList,
            click:function(e , type , data){
              that.$emit('click',e , type , data);
            }
          });
        }else{
          console.log('svg removeItem');
          this.svgObj.removeItem();
          this.svgObj.setItemList(this.itemList);
        }
        this.setReady();
        WY.trigger('svg-show-complete');
      },
      setReady:function(){
        if(this.isSetReady)return false;
        this.isSetReady = 1;
        var that = this;
        WY.oneBind('set-user-head-img',function(svgData , userInfo){
          userInfo.done && userInfo.done(that.svgObj.setUserHeadImg(svgData , userInfo), svgData);
        } , this);
      }
    }
  }
</script>
