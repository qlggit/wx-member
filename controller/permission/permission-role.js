var express = require('express');
var router = express.Router();
var mongo = useMongo();
var roleDb = mongo.create('permissionInfo');
var md5 = require('md5');

router.get('/',useValidate.hasLogin,usePermission.authMenu('menu0101'),  function(req, res, next) {
    res.useRender('permission/role');
});

router.get('/data',useValidate.hasLogin, function(req, res, next) {
    var findData = {};
    if(req.query.name){
        findData.name = new RegExp(req.query.name);
    }
    useData.getRole({},function(a){
        res.useSend(a);
    });
});

router.post('/add',useValidate.hasLogin, function(req, res, next) {
    var sendData = mongo.createData('permissionInfo' , req.body);
    sendData.createTime = new Date;
    sendData.updateTime = new Date;
    sendData.type = 'role';
    roleDb.save(sendData , function(a){
        res.useSend(a);
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    if(req.body.permissionCode)req.body.permissionCode = req.body.permissionCode.split(',');
    if(req.body.groupId)req.body.groupId = req.body.groupId.split(',');
    if(req.body.menuCode)req.body.menuCode = req.body.menuCode.split(',');
    var sendData = mongo.createData('permissionInfo' , req.body);
    sendData.updateTime = new Date;
    roleDb.update({_id:req.body._id} ,sendData , function(a){
        res.useSend(a);
    })
});
router.post('/delete',useValidate.hasLogin, function(req, res, next) {
    roleDb.del({_id:req.body._id} , function(a){
        res.useSend(a);
    })
});

exports.router = router;

exports.__path = '/permission/role';