var express = require('express');
var router = express.Router();
var mongo = useMongo();
var md5 = require('md5');

router.post('/upload',function(req , res , next){
    req.fileDate = useCommon.parseDate(new Date , 'Ymd');
    next();
},useMulter.file(),function(req, res, next) {
    console.log(req.file);
    req.file.showUrl = useMulter.getShowUrl(req.file.filename ,'/'+req.fileDate);
    res.useSend({
        code:0,
        file:req.file
    });
});

router.post('/api',function(req , res , next){
    req.pipe(useRequest.request(useUrl.file.upload)).pipe(res);
});

exports.router = router;

exports.__path = '/file';