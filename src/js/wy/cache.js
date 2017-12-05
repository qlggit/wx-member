var cacheData = {};
WY.getCache = function(key , call){
    if(cacheData[key]){
      call && call(cacheData[key]);
      return cacheData[key];
    }
    handler[key] && handler[key](call);
};
WY.setCache = function(key , data){
  cacheData[key] = data;
};
var handler = {
  cityData:function(call){
    WY.get('/city/data',function(a){
      var cityAllList = a.data;
      var firstList = [];
      cityAllList.forEach(function(a){
        if(a.name.length > 2){
          a.name = a.name.replace(/市$/,'');
        }
        a.spellFirst = a.alphabeticalFirstAlphabet.slice(0,1);
        if(firstList.indexOf(a.spellFirst) === -1){
          firstList.push(a.spellFirst);
        }
      });
      firstList.sort();
      var sortList = [];
      firstList.forEach(function(a){
        var list = cityAllList.filter(function(b){
          return b.spellFirst === a;
        });
        sortList.push({
          first:a,
          list:list
        })
      });
      cacheData.cityData = {
        cityAllList:cityAllList,
        cityList:sortList,
      };
      call && call(cacheData.cityData);
    },{needAbort:0});
  }
};
