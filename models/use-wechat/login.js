module.exports = function(req , res , unionid , call){
    useRequest.send(req , res , {
        url:useUrl.login.wxLogin,
        method:'POST',
        notBody:1,
        data:{
          unionid:unionid
        },
        done:function(a){
            call && call(a);
        }
    })
};
