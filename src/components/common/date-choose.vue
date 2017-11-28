<template>
  <div class="pt-20 pb-20">
    <div class="flex-between width-50 margin-auto mb-10">
      <div><span class="checkbox" :class="chooseDateType==0?'active':''" @click="chooseDateType=0"></span>今天</div>
      <div><span class="checkbox" :class="chooseDateType==1?'active':''" @click="chooseDateType=1"></span>明天</div>
    </div>
    <div class="flex-left width-50-100 margin-auto" >
      <span class="checkbox" :class="chooseDateType==2?'active':''" @click="chooseDateType=2"></span>区间
      <div class="fz-28 color-104 " @click="doSelectDate('chooseStartDate')">
        <span class="color-24 mr-08">{{dateData.chooseStartDate}}</span>
        <img src="/images/ico/down.png" class="width-22 height-14" alt="">
      </div>
      <div class="fz-28 color-104 " @click="doSelectDate('chooseEndDate')">
        <span class="color-24 mr-08">{{dateData.chooseEndDate}}</span>
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
        this.$emit('click',v);
      }
    }
  }
</script>
