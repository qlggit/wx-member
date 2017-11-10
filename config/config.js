//admin 1234yqs_admin
module.exports = {
    "port":3001,
    uploadPath:'build/upload',
    apiUrl:'http://192.168.1.245:8080',
    apiImgUrl:'http://192.168.1.245:8080',
    wechatLoginUrl:'http://h5.yqsapp.com/wechat/entrance/test?port=3001',
    wechatJssdkUrl:'http://h5.yqsapp.com/wechat/jssdk/test?prot=3001',
    "log4js":{
        "customBaseDir" :"/logs/",
        "customDefaultAtt" :{
            "type": "dateFile",
            "absolute": true,
            "alwaysIncludePattern": true
        },
        "appenders": [
            {"type": "console", "category": "console"},
            {"pattern": "debug/yyyyMMdd.log", "category": "logDebug"},
            {"pattern": "info/yyyyMMdd.log", "category": "logInfo"},
            {"pattern": "warn/yyyyMMdd.log", "category": "logWarn"},
            {"pattern": "err/yyyyMMdd.log", "category": "logErr"}
        ],
        "replaceConsole": true,
        "allConsole":true,
        "levels":{ "logDebug": "DEBUG", "logInfo": "DEBUG", "logWarn": "DEBUG", "logErr": "DEBUG"}
    },
    dbOptions:{
        host:'114.55.36.145',
        port:'27017',
        dbname:'pc'
    }
};

