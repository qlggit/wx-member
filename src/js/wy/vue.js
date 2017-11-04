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
document.documentElement.style.fontSize = 100 * (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth) / 750 + 'px';
