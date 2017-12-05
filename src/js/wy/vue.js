WY.oneReady = function(type , func , oneObj){
  oneObj.vueWyHandler = oneObj.vueWyHandler || [];
  oneObj.vueWyHandler.push(oneObj);
  WY.ready(type , func);
};
WY.oneReadyOnce = function(type , func , oneObj){
  oneObj.vueWyHandler = oneObj.vueWyHandler || [];
  oneObj.vueWyHandler.push(oneObj);
  WY.readyOnce(type , func);
};
WY.oneBind = function(type , func , oneObj){
  oneObj.vueWyHandler = oneObj.vueWyHandler || [];
  oneObj.vueWyHandler.push(oneObj);
  WY.bind(type , func);
};
WY.oneUnBind = function(oneObj){
  var vueWyHandler = oneObj.vueWyHandler;
  if(vueWyHandler){
    vueWyHandler.forEach(function(a){
      WY.clearBind(a);
    })
  }
};
var abortXhr = [];
WY.bind('router-change' , function(){
  abortXhr.forEach(function(a){
    a && a.abort && a.abort();
  });
  abortXhr = [];
});
WY.bind('request-complete' , function(options , xhr){
  var index = abortXhr.indexOf(xhr);
  if(abortXhr > -1)abortXhr.splice(index , 1);
});
WY.bind('request-send-filter',function(options , xhr){
  console.log('needAbort --> ' + options.needAbort , options.url);
  if(options.needAbort){
    abortXhr.push(xhr);
  }
});


