var request =require('request');
module.exports = {
    send:function(req, res , options ){
        var sendData = Object.assign({} , options.data);
        var method = options.method || 'GET';
        var headers = options.headers || {};
        var __ = {
            url:options.url,
            method:method.toUpperCase(),
            headers:headers
        };
        if(method.toUpperCase() === 'POST' && !options.notBody){
                __.body = JSON.stringify(sendData);
                __.headers["content-type"] =  "application/json";
        }else{
            var urlStr = useCommon.serialize(sendData);
            if(urlStr)__.url +=(__.url.indexOf('?')===-1?'?':'&') + urlStr;
        }
        console.log('request start : ');
        console.log(__);
        request(__ , function(err , response , body){
            try{
                body = JSON.parse(body);
            }catch(e){
            }
            if(typeof body === 'string'){
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
