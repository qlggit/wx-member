<template>
  <div class="pt-20 pb-20">
    <div class="flex-between mb-10">
      <label @click="chooseDateType=0" class="flex-left cursor-pointer">
        <span class="checkbox mr-10" :class="chooseDateType==0?'active':''" ></span>
        <span class="choose-text">今天</span>
      </label>
      <label @click="chooseDateType=1" class="flex-left cursor-pointer">
        <span class="checkbox mr-10" :class="chooseDateType==1?'active':''" ></span>
        <span class="choose-text">明天</span>
      </label>
    </div>
    <div class="flex-between cursor-pointer" >
      <div class="mr-10 flex-left">
        <span @click="chooseDateType=2" class="checkbox mr-10" :class="chooseDateType==2?'active':''" ></span>
        <span @click="chooseDateType=2" class="choose-text break-none">{{dateData.isOne?'时间':'区间'}}</span>
      </div>
      <div class="fz-28 mr-10 choose-text flex-left" @click="doSelectDate('chooseStartDate')">
        <span class="mr-08 break-none">{{dateData.chooseStartDate}}</span>
        <img src="/images/ico/down.png" class="width-22 height-14" alt="">
      </div>
      <div v-if="!dateData.isOne" class="mr-10">-</div>
      <div v-if="!dateData.isOne" class="fz-28 choose-text flex-left" @click="doSelectDate('chooseEndDate')">
        <span class=" mr-08 break-none">{{dateData.chooseEndDate}}</span>
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
