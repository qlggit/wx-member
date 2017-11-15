<template>
  <picker v-if="dateVisible" v-model="dateVisible" :data-items="items" @change="onValuesChange">
    <div class="top-content fz-30 color-24 position-relative clearfix" slot="top-content">
      <div class="float-left">{{dateData.title}}</div>
      <div class="btn btn-lt float-right back-24 color-white width-30-100" @click="selectValue">确定</div>
    </div>
  </picker>
</template>
<script>
  export default {
    props:['value','dateData'],
    data(){
      return {
        dateVisible:this.value,
        dateData:this.dateData,
        items:[]
      }
    },
    watch:{
      dateVisible:function(v){
        this.$emit('input',v);
      }
    },
    created:function(){
      console.log(this.dateVisible);
      var nowDate = new Date;
      this.nowYear = WY.common.parseDate(nowDate,'Y') - 0;
      this.nowMonth = WY.common.parseDate(nowDate,'m') - 0;
      this.nowDay = WY.common.parseDate(nowDate,'d') - 0;
      var startDate = this.dateData.startDate;
      var endDate = this.dateData.endDate;
      this.endYear = endDate && (WY.common.parseDate(endDate,'Y') - 0);
      this.endMonth = endDate && (WY.common.parseDate(endDate,'m') - 0);
      this.endDay = endDate && (WY.common.parseDate(endDate,'d') - 0);
      this.startYear = startDate && (WY.common.parseDate(startDate,'Y') - 0);
      this.startMonth = startDate && (WY.common.parseDate(startDate,'m') - 0);
      this.startDay = startDate && (WY.common.parseDate(startDate,'d') - 0);
      this.selectDate = this.dateData.selectDate || new Date;
      this.selectYear = WY.common.parseDate(this.selectDate  , 'Y') - 0;
      this.selectMonth = WY.common.parseDate(this.selectDate  , 'm') - 0;
      this.selectDay = WY.common.parseDate(this.selectDate  , 'd') - 0;
      var items = this.items;
      items.push({
      });
      items.push({
      });
      items.push({
      });
      this.setYear();
      this.setMonth();
      this.setDate();
    },
    methods:{
      setYear:function(){
        var items = this.items;
        var maxYear = this.endYear;
        var minYear = this.startYear;
        if(!minYear){
          minYear = maxYear && (maxYear - 30) || (this.selectYear - 15);
        }
        if(!maxYear){
          maxYear = minYear + 30;
        }
        items[0].values = [];
        for(var i=minYear;i<=maxYear;i++){
          items[0].values.push(i);
        }
        items[0].index = items[0].values.indexOf(this.selectYear);
      },
      setMonth:function(){
        var items = this.items;
        var maxMonth = this.endMonth;
        var minMonth = this.startMonth;
        var thisYear = this.selectYear;
        if(!maxMonth || this.endYear !== thisYear){
          maxMonth = 12;
        }
        if(!minMonth || this.startYear !== thisYear){
          minMonth = 1;
        }
        items[1].values = [];
        for(var i=minMonth;i<=maxMonth;i++){
          items[1].values.push(i);
        }
        if(this.selectMonth >= minMonth && this.selectMonth <= maxMonth){
          items[1].index = items[1].values.indexOf(this.selectMonth - 0);
        }else{
          items[1].index = 0;
        }
      },
      setDate:function(){
        var items = this.items;
        var maxDay = this.endDay;
        var minDay = this.startDay;
        var thisYear = this.selectYear;
        var thisMonth = this.selectMonth;
        if(!maxDay || this.endMonth !== thisMonth || thisYear !== this.endYear){
          if([1,3,5,7,8,10,12].indexOf(thisMonth) > -1){
            maxDay = 31;
          }else if([4,6,9,11].indexOf(thisMonth) > -1){
            maxDay = 30;
          }else{
            if(!(thisYear % 400) || ((thisYear%100) && !(thisYear%4))){
              maxDay = 29;
            }else{
              maxDay = 28;
            }
          }
        }
        if(!minDay || this.startMonth !== thisMonth || this.startYear !== thisYear){
          minDay = 1;
        }
        items[2].values = [];
        for(var i=minDay;i<=maxDay;i++){
          items[2].values.push(i);
        }
        if(this.selectDay >= minDay && this.selectDay <= maxDay){
          items[2].index = items[2].values.indexOf(this.selectDay - 0);
        }else{
          items[2].index = 0;
        }
      },
      onValuesChange:function(v1,v2,v3){
        console.log(v1,v2,v3);
        console.log(this.selectYear,this.selectMonth,this.selectDay);
        if(v1 != this.selectYear){
          this.selectYear = v1 - 0;
          this.setMonth();
        }
        if(v2 != this.selectMonth){
          this.selectMonth = v2 - 0;
          this.setDate();
        }
        if(v3 != this.selectDay){
          this.selectDay = v3 - 0;
        }
      },
      selectValue:function(){
        this.$emit('click',[this.selectYear,this.selectMonth,this.selectDay]);
        this.$emit('input',0);
      }
    }
  }
</script>
