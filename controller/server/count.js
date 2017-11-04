var express = require('express');
var router = express.Router();
var mongo = useMongo();
var md5 = require('md5');
var activityListDb = mongo.create('activityList');
router.get('/shake',useValidate.bossToken,function(req, res, next) {
    useShake.getShake(function(data , message){
        var selectData = {};
        if(req.query.type){
            selectData.activityId = data._id;
        }
        activityListDb.group(['prizeName'] , selectData ,function(a){
            a.data = a.data.map(function(b){
                return {
                    productName:b.prizeName,num:b.num
                }
            });
            res.send(a);
        })
    });
});
exports.router = router;
exports.__path = '/server/count';