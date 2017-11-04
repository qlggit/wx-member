<template>
  <div class="page-footer position-fixed z-index-1000 bottom-0 left-0 width-100-100 back-white">
    <div @click="footerClick('dynamic')" :class="footerType=='dynamic'?'active':''">
      <div class="img dynamic-img margin-auto"></div>
      <div class="text text-center lh-20">动态</div>
    </div>
    <div @click="footerClick('user')" :class="footerType=='user'?'active':''">
      <div class="img my-img margin-auto"></div>
      <div class="text text-center lh-20">我的</div>
    </div>
  </div>
</template>
<script>
  export default {
    data:function(){
      return {
        footerType:localStorage.footerType || 'dynamic'
      };
    },
    beforeDestroy:function(){
      WY.oneUnBind(this);
    },
    created:function(){
      var that = this;
      WY.oneBind('router-change' , function(data){
        that.setType(data.to.path);
      } , this);
      this.setType(location.pathname);
    },
    methods:{
      setType:function(path){
        if(path === '/dynamic')this.footerType = 'dynamic';
        if(path === '/user')this.footerType = 'user';
      },
      footerClick:function(type){
        this.footerType = localStorage.footerType = type;
        this.$router.push('/' + type);
      }
    }
  }
</script>
