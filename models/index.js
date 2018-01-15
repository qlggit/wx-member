module.exports = {
    fileReader:require('./file-reader'),
    controller:require('./controller'),
    config:require('./use-config'),
    domain:require('./use-domain'),
    common:require('./use-common'),
    multer:require('./use-multer'),
    validate:require('./use-validate'),
    data:require('./use-data'),
    permission:require('./use-permission'),
    init:function(app , call){
        //捕获异步产生的异常
        app.use(this.domain);
        //公用方法
        global.useCommon = this.common;
        //加载配置
        global.useConfig = this.config;
        global.useCaptcha = require('./captcha.js');
        this.config.start(app);
        //封装新的render
        app.use(require('./use-render'));

        //枚举
        global.useEnum = require('./use-enum/enum.js');
        //code枚举
        global.useCodeEnum = require('./use-enum/codeEnum.js');

        global.useMongo = require('./use-mongoose');
        //公用数据
        global.useData = this.data;
        //log
        global.useLog = require('./use-log');
        //request
        global.useRequest = require('./use-request');
        //validate
        global.useValidate = this.validate;
        //validate
        global.usePermission = this.permission;
        //validate
        global.useMulter = this.multer;
        //加载session
        global.useSession = require('./session/mongo');
        app.use(useSession.init());
        global.usePageSize = 20;
        global.useWechat =  require('./use-wechat');
        app.use(function(req , res , next){
            var method = req.method;
            //403
            // if(method === 'POST' && req.url.indexOf('file') === -1&& req.url.indexOf('test') === -1&& req.url.indexOf('server') === -1){
            //     if(req.body.__CSRF !== req.session.__CSRF){
            //         if(!req.session.__CSRF){
            //             req.session.__CSRF = Date.now();
            //         }
            //         return res.sendErrorMessage('HTTP_CODE_403','');
            //     }
            // }
            next();
        });

        var _this = this;
        //URL对象管理
        global.useUrl = require('./url.js');

        //初始化
        for(var i in this){
            if(this[i].init)this[i].init();
        }
        //global.useWs = require('./use-ws');
        this.controller(app  , function(){
            //路由已经绑定完

            //捕获错误的统一处理
            app.use(require('./error'));

            //404处理 找不到的页面返回首页
            app.use(function(req, res){
              if(!req.session.tokenModel && !/MicroMessenger/.test(req.headers['user-agent'])){
                res.redirect('/wechat/download');
                return false;
              }
              res.useRender('index');
            });

            var port = process.env.PORT || _this.config.get('port') || 3000;
            app.listen(port);
            useLog.log('start at http://127.0.0.1:' + port );
            if(call)call();
        });
    }
}
