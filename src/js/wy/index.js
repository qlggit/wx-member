window.WY = {};
(function(){
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  WY.CLIENT = {
    trident: /(Trident)/i.test(ua), // IE内核
    presto: /(Presto)/i.test(ua), // opera内核
    webKit: /(AppleWebKit)/i.test(ua), // google内核
    gecko: /(Trident)/i.test(ua), // 火狐内核
    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: /(Android|Linux)/i.test(ua),
    iPhone: /(iPhone|Mac)/i.test(ua),
    iPad: /(iPad)/i.test(ua),
    wechat: /(MicroMessenger)/i.test(ua),
    qq: /(QQ)/i.test(ua),
    pc: !/(Android|iPhone|iPod|iOS|SymbianOS|Windows Phone)/i.test(ua),
    mobile: /mobile|tablet|ip(ad|hone|od)|android/i.test(ua),
    isIE: /MSIE|Trident/i.test(ua)
  };
  WY.clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
  WY.clientHeight = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
  var fontSize = 100 * WY.clientWidth / 750;
  //pc处理
  if(WY.clientWidth > 750){
    fontSize = 50;
  }
  document.documentElement.style.fontSize = fontSize + 'px';
  WY.fontSizeScale = fontSize / 100;
  WY.getScaleSize = function(size){
    return size * WY.fontSizeScale;
  }
})();
require('./base.js');
require('./prop.js');
require('./handler.js');
require('./vue.js');
require('./jq.js');
require('./window.js');
require('./request.js');
require('./session.js');
require('./file.js');
require('./component.js');
require('./validate.js');
require('./wx.js');
require('./directive.js');
require('./filter.js');
require('./ready.js');
require('./cache.js');
require('./bridge.js');
require('../ui/index');
WY.bind('request-start-filter',function(options){
  options.headers = options.headers || {};
  options.headers.sessionId = options.headers.sessionId || WY.session.sessionId || '';
});
WY.ready('session-complete' , function(){
  WY.trigger('login');
});
WY.trigger('session');
WY.trigger('require-complete');
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();
export default WY;
