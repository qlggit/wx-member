var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.useRender('index');
});
router.get('/in', function(req, res, next) {
    if(req.session.userInfo){
        return res.redirect('/');
    }
    req.session.callback = req.query.callback;
    res.redirect('/wechat/login');
});
exports.router = router;

exports.__path = '/';