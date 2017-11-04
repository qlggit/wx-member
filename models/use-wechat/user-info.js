module.exports = function(req , res ,data , call){
    var unionid = data.unionid || data.openid || data.openId;
    var openId = data.openid || data.openId;
    useWechat.login(req , res ,unionid ,function(a){
        if(a.code != 0){
            useRequest.send(null , null ,{
                url:'https://api.weixin.qq.com/sns/userinfo?openid='+openId
                +'&access_token=' + data.access_token + '&lang=zh_CN',
                done:function(data){
                    call && call(data);
                }
            });
        }
        else call && call(data);
    })
};
