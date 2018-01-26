<template>
  <wy-window :window-data="{}" v-if="showAble">
      <div slot="content" class="border-rad-20 overflow-hidden back-white width-690 margin-auto text-center">
        <div class="pt-50">
          <img src="/images/ico/confirm.png" class="confirm-ico" alt="">
        </div>
        <div class="pt-40 pb-40 fz-32">{{content}}</div>
        <div v-if="remark" class="color-104 fz-24 pt-20 pb-20">{{remark}}</div>
        <div class="clearfix ">
          <div class="btn-50 back-233 float-left color-24" @click="doSubmit(0)">{{cancelText}}</div>
          <div  @click="doSubmit(1)" class="btn-50 back-24 float-right color-white">
            {{submitText}}
          </div>
        </div>
      </div>
  </wy-window>
</template>
<script>
  export default {
    data:function(){
      return {
        showAble:false,
        cancelText:'取消',
        submitText:'确定',
        remark:'',
        content:'',
        done:''
      };
    },
    created:function(){
      var that = this;
      WY.bind('confirm',function(options){
        that.showAble = options.showAble;
        that.content = options.content;
        that.done = options.done;
        that.remark = options.remark;
        that.cancelText = options.cancelText || '取消';
        that.submitText = options.submitText || '确定';
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
