module.exports = function(req , res , next){
    var redirectUrl;
    if(req.session.userInfo){
        return next();
    }
    redirectUrl = '/wechat/login';
    console.log(req.xhr);
    console.log(req.headers);
    console.log(req['X-Requested-With']);
    if(req.xhr){
        return res.sendErrorMessage('HTTP_CODE_401',{
            redirectUrl:redirectUrl
        });
    }else{
        res.useRedirect(redirectUrl);
    }
};
