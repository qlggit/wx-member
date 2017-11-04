var express = require('express');
var router = express.Router();
var mongo = useMongo();
var permissionDb = mongo.create('permission');
var menuDb = mongo.create('permissionMenu');
var md5 = require('md5');

router.get('/',useValidate.hasLogin, function(req, res, next) {
    res.useRender('permission/list');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useData.getPermissionList(function(a){
        res.useSend({code:0,data:a});
    })
});
router.post('/add',useValidate.hasLogin, function(req, res, next) {
    var sendData = mongo.createData('permission' , req.body);
    sendData.createTime = new Date;
    sendData.updateTime = new Date;
    permissionDb.save(sendData , function(a){
        if(a.code == 0)useData.clearData(['permission']);
        res.useSend(a);
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    var sendData = mongo.createData('permission' , req.body);
    sendData.updateTime = new Date;
    permissionDb.update({_id:req.body._id} ,sendData , function(a){
        if(a.code == 0)useData.clearData(['permissionList']);
        res.useSend(a);
    })
});
router.post('/delete',useValidate.hasLogin, function(req, res, next) {
    permissionDb.del({_id:req.body._id} , function(a){
        if(a.code == 0)useData.clearData(['permissionList']);
        res.useSend(a);
    })
});

router.get('/menu', useValidate.hasLogin,function(req, res, next) {
    res.useRender('permission/menu');
});

router.get('/menu/data',useValidate.hasLogin, function(req, res, next) {
    useData.getMenuList(function(a){
        res.useSend({code:0,data:a});
    })
});
router.post('/menu/add',useValidate.hasLogin, function(req, res, next) {
    var sendData = mongo.createData('permissionMenu' , req.body);
    sendData.createTime = new Date;
    sendData.updateTime = new Date;
    menuDb.save(sendData,function(a){
        if(a.code == 0)useData.clearData(['menuList']);
        res.useSend(a);
    });
});
router.post('/menu/update',useValidate.hasLogin, function(req, res, next) {
    var sendData = mongo.createData('permissionMenu' , req.body);
    sendData.createTime = new Date;
    sendData.updateTime = new Date;
    menuDb.update({_id:req.body._id},sendData,function(a){
        if(a.code == 0)useData.clearData(['menuList']);
        res.useSend(a);
    });
});
router.post('/menu/delete',useValidate.hasLogin, function(req, res, next) {
    menuDb.del({_id:req.body._id},function(a){
        if(a.code == 0)useData.clearData(['menuList']);
        res.useSend(a);
    });
});

exports.router = router;

exports.__path = '/permission';