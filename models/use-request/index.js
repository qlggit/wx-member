var request =require('request');
var md5 = require('md5');
module.exports = {
    send:function(req, res , options ){
        var sendData = useCommon.extend({} , options.data);

        var method = options.method || 'GET';
        var headers = options.headers || {};
        var __ = {
            url:options.url,
            method:method.toUpperCase(),
            headers:headers
        };
        if(options.apiToken){
            delete sendData.__;
            delete sendData.__CSRF;
            delete sendData.token;
            var timestamp = Date.now();
            var token = md5(useConfig.get('appid')+ timestamp + useConfig.get('appsecrect'));
            headers.timestamp = timestamp;
            headers.sign = token;
            __.url +=(__.url.indexOf('?')==-1?'?':'&') + useCommon.serialize({partnerId:useConfig.get('appid')});
        }
        if(method.toUpperCase() == 'POST' && !options.notBody){
                __.body = JSON.stringify(sendData);
                __.headers["content-type"] =  "application/json";
        }else{
            var urlStr = useCommon.serialize(sendData);
            if(urlStr)__.url +=(__.url.indexOf('?')==-1?'?':'&') + urlStr;
        }
        console.log('request start : ');
        console.log(__);
        request(__ , function(err , response , body){
            try{
                body = JSON.parse(body);
            }catch(e){
            }
            if(options.apiToken){
                if(body.code == 'SUCCESS'){
                    body.code = useCodeEnum.SUCCESS[0];
                    body.data = body.result;
                    delete body.result;
                }
                else body.code = useCodeEnum.API_ERROR_CODE[0];
            }
            if(typeof body == 'string'){
                body = {
                    data:body,
                    message:'系统繁忙'
                }
            }
            console.log(body);
            options.done(body || {code:1,msg:'系统异常'});
        });
    },
    request : request
};