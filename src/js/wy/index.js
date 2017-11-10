window.WY = {};
(function(){
  WY.clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
  WY.clientHeight = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
  var fontSize = 100 * WY.clientWidth / 750;
  document.documentElement.style.fontSize = fontSize + 'px';
  WY.fontSizeScale = fontSize / 100;
  WY.getScaleSize = function(size){
    return size * WY.fontSizeScale;
  }
})();
require('./base.js');
require('./handler.js');
require('./vue.js');
require('./router.js');
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
require('../ui/index');
WY.bind('request-start-filter',function(options){
  options.headers = options.headers || {};
  options.headers.sessionId = options.headers.sessionId || WY.session.sessionId || '';
});
var hasLogin = false;
WY.ready('session-complete' , function(){
  if(!hasLogin || !WY.session.userInfo)WY.trigger('login');
  hasLogin = true;
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
