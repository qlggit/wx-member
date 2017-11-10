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


