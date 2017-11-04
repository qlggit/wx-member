function wechat(){

}
wechat.access_token = require('./access_token');
wechat.jsapi_ticket = require('./jsapi_ticket');
wechat.userInfo = require('./user-info');
wechat.event = require('./event');
wechat.sign = require('./sign');
wechat.login = require('./login');
module.exports = wechat;