//admin 1234yqs_admin
module.exports = {
  debug:0,
    apiUrl:'http://47.100.20.78:8012',
    threeUrl:'http://47.100.20.78:8080',
  wechatLoginUrl:'http://47.100.20.78:3002/wechat/entrance/test3001',
  wechatJssdkUrl:'http://47.100.20.78:3002/wechat/jssdk/test3001',
    "log4js":{
        "customBaseDir" :"../logs/wx-member/",
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
        host:'127.0.0.1',
        port:'27017',
        dbname:'wxmember'
    }
};

