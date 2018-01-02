var express = require('express');
var router = express.Router();
router.get('/', useValidate.hasLogin, function(req, res, next) {
    res.useRender('index');
});
router.get('/in', function(req, res, next) {
    if(req.session.userInfo && req.session.userInfo.userId){
        return res.redirect('/');
    }
    req.session.callback = req.query.callback;
    res.redirect('/wechat/login');
});
router.get('/in/h5', function(req, res, next) {
    if(req.session.userInfo && req.session.userInfo.userId){
        return res.redirect('/');
    }
    req.session.callback = req.query.callback;
    res.redirect('/wechat/login/h5');
});
exports.router = router;
exports.__path = '/';
