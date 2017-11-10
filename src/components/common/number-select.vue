<template>
  <div class="lh-0 inline-block number-select">
      <div v-show="numberData.number>0" class="number-ico diff inline-block text-middle" @click="changeNumber(-1)"></div>
      <span v-show="numberData.number>0" class="text-middle inline-block fz-34 lh-40 ml-inline width-40 text-center">{{numberData.number}}</span>
      <div class="number-ico add inline-block text-middle ml-inline" @click="changeNumber(1)"></div>
  </div>
</template>
<script>
  export default {
    props:['numberData'],
    data:function(){
      return {
        numberData:this.numberData
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
