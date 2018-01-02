var request =require('request');
module.exports = {
    send:function(req, res , options ){
        var sendData;
        if(typeof sendData !== 'object'){
          sendData = options.data;
        }else{
          sendData = Object.assign({} , options.data);
          if(!sendData.ip)sendData.ip = req.remoteAddress
        }
        var method = options.method || 'GET';
        var headers = options.headers || {};
        var tokenModel = req.session.tokenModel ;
        headers.tokenInfo = options.tokenInfo || (tokenModel && [tokenModel.userId,tokenModel.token].join('_') || '');
        var __ = {
            url:options.url,
            method:method.toUpperCase(),
            headers:headers
        };
        if(method.toUpperCase() === 'POST' && !options.notBody){
                __.body = useCommon.stringify(sendData);
                __.headers["content-type"] =  "application/json";
        }else{
            var urlStr = useCommon.serialize(sendData);
            if(urlStr)__.url +=(__.url.indexOf('?')===-1?'?':'&') + urlStr;
        }
        console.log('request start : ');
        console.log(__);
        request(__ , function(err , response , body){
            if(response && response.statusCode === 401){
                res.status(401).end();
                return false;
            }
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
            if(body){
              body.baseCode = body.code;
              if(body.code - 0 === 10002){
                res.status(401).end();
                return false;
              }
              if(body.code - 0 === 10000){
                body.code = 0;
              }
              if(body.result && !body.data){
                body.data = body.result;
                delete body.result;
              }
            }
            options.done(body || {code:1,msg:'系统异常'});
        });
    },
    request : request
};
