<template>
  <picker v-if="dateVisible" v-model="dateVisible" :data-items="items" @change="onValuesChange">
    <div class="top-content fz-30 color-24 position-relative flex-between pt-20 pb-20 back-242 pl-20 pr-20" slot="top-content">
      <div class="btn btn-lt color-999 width-30-100" @click="selectCancel">取消</div>
      <div class="width-40-100">{{dateData.title}}</div>
      <div class="btn btn-lt  back-24 color-white width-30-100" @click="selectValue">确定</div>
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
    },
    created:function(){
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
        index:0,
        values:[],
      });
      items.push({
        index:0,
        values:[],
      });
      items.push({
        index:0,
        values:[],
      });
      this.setYear();
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
        var values = items[0].values;
        for(var i=minYear;i<=maxYear;i++){
          values.push(i);
        }
        items[0].index = values.indexOf(this.selectYear);
        this.setMonth();
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
        items[1].values.splice(0);
        var values = items[1].values;
        for(var i=minMonth;i<=maxMonth;i++){
          values.push(i);
        }
        console.log(this.selectMonth , minMonth , maxMonth);
        items[1].index = 0;
        if(this.selectMonth >= minMonth && this.selectMonth <= maxMonth){
          items[1].index = values.indexOf(this.selectMonth);
        }else{
          this.selectMonth = values[0];
        }
        console.log(items[1].index , this.selectMonth)
        this.setDate();
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
        items[2].values.splice(0);
        var values = items[2].values;
        for(var i=minDay;i<=maxDay;i++){
          values.push(i);
        }
        items[2].index = 0;
        if(this.selectDay >= minDay && this.selectDay <= maxDay){
          items[2].index = values.indexOf(this.selectDay - 0);
        }else{
          this.selectDay = values[0];
        }
        console.log(items[2].index , this.selectDay);
      },
      onValuesChange:function(v1,v2,v3){
        if(this.selectYear !== v1 - 0){
          this.yearChange(v1);
        }
        if(this.selectMonth !== v2 - 0){
          this.monthChange(v2);
        }
        if(this.selectDay !== v3 - 0){
          this.selectDay = v3;
        }
      },
      yearChange:function(v){
        clearTimeout(this.yearTimer);
        this.yearTimer = setTimeout(function(v){
          this.selectYear = v - 0;
          this.setMonth();
        }.bind(this,v),300);
      },
      monthChange:function(v){
        clearTimeout(this.monthTimer);
        this.monthTimer = setTimeout(function(v){
          if(v!==undefined)this.selectMonth = v - 0;
          this.setDate();
        }.bind(this,v),300);
      },
      selectValue:function(){
        this.$emit('click',[this.selectYear,this.selectMonth,this.selectDay]);
        this.$emit('input',0);
      },
      selectCancel:function(){
        this.$emit('input',0);
      }
    }
  }
</script>
