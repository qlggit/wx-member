<template>
  <div class="lh-0 flex-between number-select" @click.stop="clickCount++">
      <div v-show="numberData.number>0" class="number-ico diff inline-block text-middle" @click="changeNumber(-1)"></div>
      <span class="text-middle inline-block fz-34 lh-40  width-40 text-center num">{{numberData.number||''}}</span>
      <div class="number-ico add inline-block text-middle" @click="changeNumber(1)"></div>
  </div>
</template>
<script>
  export default {
    props:['numberData'],
    data:function(){
      return {
        numberData:this.numberData,
        clickCount:0
      };
    },
    beforeDestroy:function(){
    },
    created:function(){
    },
    methods:{
      changeNumber:function(num){
        var number = this.numberData.number + num;
        if(this.numberData.minNumber && number < this.numberData.minNumber)number = this.numberData.minNumber;
        if(this.numberData.maxNumber && number > this.numberData.maxNumber)number = this.numberData.maxNumber;
        this.numberData.number = number;
        this.$emit('changeNumber',{
          number:this.numberData.number,
          dataId:this.numberData.dataId,
          type:this.numberData.type,
        });
      }
    }
  }
</script>
