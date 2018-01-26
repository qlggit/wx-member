<template>
  <wy-window :window-data="{}" v-if="showAble">
      <div slot="content" class="border-rad-20 overflow-hidden back-white width-690 margin-auto text-center">
        <div class="pt-30 fz-32">{{title}}</div>
        <div class="pt-20 pb-20 fz-28 break-all pl-20 pr-20 lh-32" v-html="content"></div>
        <div class="pb-30 pl-40 pr-40">
          <div class="btn btn-sm border-24 color-24" @click="showAble=false">{{submitText}}</div>
        </div>
      </div>
  </wy-window>
</template>
<script>
  export default {
    data:function(){
      return {
        showAble:false,
        submitText:'',
        title:'',
        content:'',
        done:''
      };
    },
    created:function(){
      var that = this;
      WY.bind('message',function(options){
        that.showAble = options.showAble;
        that.content = options.content;
        that.title = options.title;
        that.submitText = options.submitText || '我知道了';
      });
      WY.bind('router-after' , function(){
        that.showAble = false;
      });
    },
    methods:{
      doSubmit:function(v){
        if(this.done && this.done(v) === false) return false;
        this.showAble = false;
      }
    }
  }
</script>
