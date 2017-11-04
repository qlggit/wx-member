module.exports = function(req , res , next){
    if(!global.JSAPI_TICKET){
        toGet();
    }else if((Date.now() - global.JSAPI_TICKET.time) / 1000 > global.JSAPI_TICKET.expires_in - 10){
        toGet();
    }else next();
    function toGet(){
        useRequest.send(req , res ,{
            url:'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ACCESS_TOKEN.access_token+'&type=jsapi',
            done:function(data){
                if(data.ticket){
                    global.JSAPI_TICKET = data;
                    global.JSAPI_TICKET.time = Date.now();
                }
                next();
            }
        })
    }
};