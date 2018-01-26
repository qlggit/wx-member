//admin 1234yqs_admin
module.exports = {
    debug:0,
    showImgUrl:'http://wx.yukew.com',
    apiUrl:'http://172.19.56.132:4200',
    h5Api:'http://h5.yukew.com',
    wechatLoginUrl:'http://h5.yukew.com/wechat/entrance/wxmember',
    wechatJssdkUrl:'http://h5.yukew.com/wechat/jssdk/wxmember',
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

