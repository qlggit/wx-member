//admin 1234yqs_admin
module.exports = {
    "port":3001,
    uploadPath:'build/upload',
    // apiUrl:'http://192.168.1.245:4200',
    apiUrl:'http://192.168.1.105:8012',
    threeUrl:'http://47.100.20.78:8080',
    apiImgUrl:'http://192.168.1.245:8080',
    wechatLoginUrl:'http://47.100.20.78:3002/wechat/entrance/test?port=3001',
    wechatJssdkUrl:'http://47.100.20.78:3002/wechat/jssdk/test?prot=3001',
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
        host:'192.168.1.245',
        port:'27017',
        dbname:'wxmember'
    }
};

