module.exports = function(req , res , next){
    if(!global.ACCESS_TOKEN){
        toGet();
    }else if((Date.now() - global.ACCESS_TOKEN.time) / 1000 > global.ACCESS_TOKEN.expires_in - 10){
        toGet();
    }else next();
    function toGet(){
        useRequest.send(req , res ,{
            url:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + useConfig.get('appId') + '&secret=' + useConfig.get('appSecret'),
            done:function(data){
                if(data.access_token){
                    global.ACCESS_TOKEN = data;
                    global.ACCESS_TOKEN.time = Date.now();
                }
                next();
            }
        })
    }
};