//admin 1234yqs_admin
module.exports = {
    uploadPath:'build/upload',
    apiImgUrl:'http://img.yqsapp.com/',
    apiUrl:'http://api.yqsapp.com',
    webUrl:'http://wbapi.yqsapp.com',
    appid:'00001yqs',
    appsecrect:'8uRomZ58IYCzdnnduNoS6B8heY9QZCjo',
    "log4js":{
        "customBaseDir" :"../logs/pc-boss",
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
        dbname:'pc'
    }
};

