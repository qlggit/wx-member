WY.datePicker = {
  show:function(options){
    var vue = options.vue;
    var autoYear,autoMonth,autoDay;
    if(options.date){
      autoYear = WY.common.parseDate(options.date,'Y');
      autoMonth = WY.common.parseDate(options.date,'m');
      autoDay = WY.common.parseDate(options.date,'d');
    }
    var yearItem = [],monthItem=[],dayItem=[];
    var yearIndex=70,monthIndex=0,dayIndex=0;
    var nowYear = WY.common.parseDate(new Date , 'Y');
    var startYear = nowYear - 99;
    for(;startYear<=nowYear;startYear++){
      yearItem.push(startYear);
    }
    if(autoYear){
      yearIndex=yearItem.indexOf(autoYear - 0);
      if(yearIndex == -1)yearIndex=70;
    }else autoYear = yearItem[yearIndex];
    var maxMonth = 12,maxDay=31;
    //if(nowYear == autoYear){
    //  maxMonth = WY.common.parseDate(new Date , 'm');
    //  if(autoMonth && autoMonth > maxMonth)autoMonth=1;
    //}
    for(var i=1;i<=maxMonth;i++){
      monthItem.push(i);
    }
    if(autoMonth){
      monthIndex=monthItem.indexOf(autoMonth - 0);
    }else autoMonth = monthItem[monthIndex];
    //if(autoMonth){
    //  if(autoMonth == 2){
    //    if(!(autoYear % 400) || (autoYear%100 && !(autoYear%4))){
    //      maxDay = 29;
    //    }else maxDay = 28;
    //  }else if([4,6,9,11].indexOf(autoMonth)){
    //    maxDay = 30;
    //  }
    //}
    for(var i=1;i<=maxDay;i++){
      dayItem.push(i);
    }
    if(autoDay){
      dayIndex=dayItem.indexOf(autoDay - 0);
    }else autoDay = dayItem[dayIndex];
    vue.autoYear = autoYear;
    vue.autoMonth = autoMonth;
    vue.autoDay = autoDay;
    vue.pickerDay = [autoYear , autoMonth , autoDay].join('-');
    vue.items = [
      {
        index:yearIndex,
        values:yearItem
      },
      {
        index:monthIndex,
        values:monthItem
      },
      {
        index:dayIndex,
        values:dayItem
      }
    ];
  },
  change:function(options){
    options.vue.pickerDay = WY.common.parseDate(options.values.join('-'),'Y-m-d');
  }
};
var cityData = require('../data/city.data');
var __cityCodes = ['500000','110000','310000','120000'];
__cityCodes.forEach(function(a , i){
  var o = cityData.filter(function(b){
    return b.code == a;
  })[0];
  var index = cityData.indexOf(o);
  cityData.splice(index , 1);
  cityData.unshift(o);
});
function getDataList(code){
  if(code)code+='';
  if(/0000$/.test(code)){
    return [].concat(getDataList(code.slice(0 , 2) + '0100') , getDataList(code.slice(0 , 2) + '0200'));
  }
  code = code || '000000';
  return cityData.filter(function(a){
    return a.parentCode == code;
  });
}
function getIndex(name , data){
  if(!name)return 0;
  var index;
  data.every(function(a , i){
    if(a.name == name){
      index = i;
      return false;
    }
    return true;
  });
  return index || 0;
}
function getDataByName(name,data){
  return data[getIndex(name,data)];
}
WY.cityPicker = {
  show:function(options){
    var vue = options.vue;
    vue.cityType = options.cityType || 'province';
    if(vue.cityType == 'province'){
      var list = getDataList('');
      vue.pickerProvince = options.value || list[0].name;
      vue.items = [{
        values:list.map(function(a){return a.name}),
        index:getIndex(options.value,list)
      }]
    }else{
      console.log(vue.pickerProvince);
      var code = getDataByName(vue.pickerProvince,cityData).code;
      var list = getDataList(code);
      console.log(vue.pickerProvince , code);
      console.log(list);
      vue.pickerCity = list[0].name;
      vue.items = [{
        values:list.map(function(a){return a.name})
      }]
    }
  },
  change:function(options){
    var vue = options.vue;
    if(vue.cityType == 'province'){
      vue.pickerProvince = options.value
    }else{
      vue.pickerCity = options.value
    }
  }
};
