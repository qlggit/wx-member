var express = require('express');
var router = express.Router();
var mongo = useMongo();
var userDb = mongo.create('operator');
var md5 = require('md5');

router.get('/',useValidate.hasLogin,usePermission.authMenu('menu0102'), function(req, res, next) {
    res.useRender('permission/user');
});

router.get('/data',useValidate.hasLogin, function(req, res, next) {
    var findData = {};
    if(req.query.username){
        findData.username = new RegExp(req.query.username);
    }
    userDb.find(findData,function(a){
        res.useSend(a);
    });
});

router.post('/add', useValidate.hasLogin,function(req, res, next) {
    var sendData = mongo.createData('operator' , req.body);
    sendData.createTime = new Date;
    sendData.updateTime = new Date;
    sendData.type = sendData.type || 1;
    sendData.loginCount = 0;
    sendData.errorCount = 0;
    sendData.status = 0;
    sendData.password = md5(md5('123456'));
    userDb.save(sendData , function(a){
        res.useSend(a);
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    if(req.body.roleId)req.body.roleId = req.body.roleId.split(',');
    var sendData = mongo.createData('operator' , req.body);
    sendData.updateTime = new Date;
    userDb.update({_id:req.body._id} ,sendData , function(a){
        res.useSend(a);
    })
});
router.post('/delete',useValidate.hasLogin, function(req, res, next) {
    userDb.del({_id:req.body._id} , function(a){
        res.useSend(a);
    })
});

exports.router = router;

exports.__path = '/permission/user';