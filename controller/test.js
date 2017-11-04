var express = require('express');
var router = express.Router();
var mongo = useMongo();
var activityDetailDb = mongo.create('activityDetail');
var activityListDb = mongo.create('activityList');
router.get('/name', function (req, res, next) {
    var count = 0;
    activityDetailDb.find({} , function(a){
        var activityDetailData = a.data;
        activityListDb.find({} , function(b){
            b.data.forEach(function(c){
                if(!c.prizeName){
                    count++;
                    var prizeName = activityDetailData.filter(function(a){
                        return a._id == c.shakeId
                    }).pop().name;
                    activityListDb.update({
                        _id:c._id
                    },{prizeName:prizeName},function(){
                        count--;
                        if(!count)res.send('更新完成');
                    });
                }

            });
        })
    })
});
exports.router = router;
exports.__path = '/test';