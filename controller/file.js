var express = require('express');
var router = express.Router();
router.post('/upload',useMulter.file(),function(req, res, next) {
    req.file.showUrl = useMulter.getShowUrl(req.file.filename);
    res.useSend({
        code:0,
        data:req.file
    });
});
router.post('/api',function(req , res , next){
    req.pipe(useRequest.request(useUrl.file.upload)).pipe(res);
});
router.post('/video',function(req , res , next){
    req.pipe(useRequest.request(useUrl.file.upload)).pipe(res);
});
exports.router = router;
exports.__path = '/file';
