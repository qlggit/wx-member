<template>
  <div class="page-footer position-fixed z-index-1000 bottom-0 left-0 width-100-100 back-white flex-around shadow-top-auto">
    <div v-for="(item , index) in footerList"
         @click="footerClick(index)"
         class="item"
         :class="footerIndex === index?'active':''">
      <img :src="item.img + (footerIndex === index?'-able':'')+'.png'" class="margin-auto" alt="">
      <div class="text text-center">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data:function(){
      return {
        footerIndex:0,
        footerList:[
          {
            name:'首页',
            url:'/',
            img:'images/page/footer-home'
          },
          {
            name:'我的',
            url:'/my',
            img:'images/page/footer-my'
          }
        ],
      };
    },
    beforeDestroy:function(){
      WY.oneUnBind(this);
    },
    created:function(){
      this.setType(location.pathname);
    },
    methods:{
      setType:function(path){
        var that = this;
        this.footerList.every(function(a , i){
          if(a.url === path){
            that.footerIndex = i;
            return false;
          }
          return true;
        });
      },
      footerClick:function(index){
        this.$router.push(this.footerList[index].url);
      }
    }
  }
</script>
