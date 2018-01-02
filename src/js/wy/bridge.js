function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
window.appServer = {};
window.appServer.flush = function(){
  var href = location.href;
  var hrefData = WY.common.getHrefData(href);
  if(hrefData.token){
    location.href = href;
  }else{
    location.href = WY.common.addUrlParam(href , WY.session.tokenModel);
  }
};
setupWebViewJavascriptBridge(function(bridge) {
  if(bridge){
    bridge.callHandler('appServerFlush', function () {
      appServer.flush();
    });
  }
});
