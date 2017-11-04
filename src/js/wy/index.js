window.WY = {};
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
export default WY;
