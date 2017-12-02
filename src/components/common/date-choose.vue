<template>
  <div class="pt-20 pb-20">
    <div class="flex-center width-50 margin-auto mb-10">
      <label @click="chooseDateType=0" class="mr-100 flex-left cursor-pointer">
        <span class="checkbox mr-10" :class="chooseDateType==0?'active':''" ></span>
        <span class="choose-text">今天</span>
      </label>
      <label @click="chooseDateType=1" class="flex-left cursor-pointer">
        <span class="checkbox mr-10" :class="chooseDateType==1?'active':''" ></span>
        <span class="choose-text">明天</span>
      </label>
    </div>
    <div class="flex-left width-50-100 margin-auto cursor-pointer" >
      <span @click="chooseDateType=2" class="checkbox mr-10" :class="chooseDateType==2?'active':''" ></span>
      <span @click="chooseDateType=2" class="choose-text mr-10">区间</span>
      <div class="fz-28 mr-10 choose-text flex-left" @click="doSelectDate('chooseStartDate')">
        <span class=" mr-08">{{dateData.chooseStartDate}}</span>
        <img src="/images/ico/down.png" class="width-22 height-14" alt="">
      </div>
      <div class="mr-10">-</div>
      <div class="fz-28 choose-text flex-left" @click="doSelectDate('chooseEndDate')">
        <span class=" mr-08">{{dateData.chooseEndDate}}</span>
        <img src="/images/ico/down.png" class="width-22 height-14" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['value','dateData'],
    data(){
      return {
        chooseDateType:this.value,
        dateData:this.dateData,
      }
    },
    watch:{
      chooseDateType:function(v){
        this.$emit('input' , v);
      }
    },
    created:function(){
    },
    methods:{
      doSelectDate:function(v){
        if(this.chooseDateType === 2)this.$emit('click',v);
      }
    }
  }
</script>
