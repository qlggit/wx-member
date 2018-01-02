//admin 1234yqs_admin
module.exports = {
    "port":3001,
  debug:1,
  showImgUrl:'http://127.0.0.1:3001',
    uploadPath:'upload',
    hostname:'192.168.1.119',
    // apiUrl:'http://192.168.1.245:4200',
    apiUrl:'http://192.168.1.122:8012',
    h5Api:'http://127.0.0.1:3002',
    wechatLoginUrl:'http://h5.yukew.com/wechat/entrance/test?port=3001',
    wechatJssdkUrl:'http://h5.yukew.com/wechat/jssdk/test?prot=3001',
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
        host:'120.27.213.0',
        port:'27017',
        dbname:'wxmember'
    }
};

