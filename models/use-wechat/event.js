function event(req , res , next){
    var data = req.body.xml;
    useLog.log(data);
    if(data.msgtype == 'event'){
        if(data.event == 'subscribe'){
            //关注
            event.subscribe(req , res ,data);
            return;
        }
        if(data.event == 'CLICK'){
            //点击
            return;
        }
        if(data.event == 'VIEW'){
            //跳转
            return;
        }
    }
    else if(data.msgtype == 'text'){
        event.text(req , res ,data);
        return;
    }
}
event.send = function(res , content){
    res.writeHead(200 , {'Content-Type': 'application/xml'});
    res.end(content);
};
event.subscribe = function(req , res , data){
    var xml = req.body.xml;
    var ToUserName = xml.tousername;
    var FromUserName = xml.fromusername;
    var str = '<xml>'+
        '<ToUserName><![CDATA['+FromUserName+']]></ToUserName>'+
        '<FromUserName><![CDATA['+ToUserName+']]></FromUserName>'+
        '<CreateTime>'+Date.now()+'</CreateTime>'+
        '<MsgType><![CDATA[text]]></MsgType>'+
        '<Content><![CDATA[感谢关注国内首个看广告赚钱平台，月收入轻松上万，点击下方赶快加入吧！]]></Content>'+
        '</xml>';
    event.send(res,str);
};
event.text = function(req , res , data){
    var xml = req.body.xml;
    var ToUserName = xml.tousername;
    var FromUserName = xml.fromusername;
    var str = '<xml>'+
        '<ToUserName><![CDATA['+FromUserName+']]></ToUserName>'+
        '<FromUserName><![CDATA['+ToUserName+']]></FromUserName>'+
        '<CreateTime>'+Date.now()+'</CreateTime>'+
        '<MsgType><![CDATA[text]]></MsgType>'+
        '<Content><![CDATA[如有疑问请来电：023-67983896]]></Content>'+
        '</xml>';
    event.send(res,str);
};
module.exports = event;