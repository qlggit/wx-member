module.exports = function(req , res , next){
    var redirectUrl;
    if(req.session.userInfo){
        return next();
    }
    redirectUrl = '/wechat/login';
    if(req.xhr){
        return res.sendErrorMessage('HTTP_CODE_401',{
            redirectUrl:redirectUrl
        });
    }else{
      req.session.callback = req.baseUrl + req.url;
      useSession.save(req , res , function(){
        res.useRedirect(redirectUrl);
      });
    }
};
