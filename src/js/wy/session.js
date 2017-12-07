var session = WY.session = {};
function putSession(newSession){
  session.sessionId = localStorage.sessionId || '';
  session.openId = localStorage.openId || '';
  session.userId = localStorage.userId || '';
  session.unionid = localStorage.unionid || '';
  session.apiImgUrl = localStorage.apiImgUrl || '';
  session.debug = localStorage.debug || '';
  session.hasPing = localStorage.hasPing || '';
  session.userInfo = newSession.userInfo;
  session.sanfangs = newSession.sanfangs;
  session.tokenModel = newSession.tokenModel;
  session.threeToken = newSession.threeToken;
  if(location.href.indexOf('server/') > 0){
    session.tokenInfo = localStorage.tokenInfo = [WY.hrefData.userId,WY.hrefData.token].join('_') || localStorage.tokenInfo;
    WY.ready('token-complete',session.tokenInfo);
    return false;
  }
  if(session.sessionId){
    WY.ready('session-complete',session);
  }else{
    wechatLogin();
  }
  if(session.userInfo){
    session.userInfo.headImgUrl = session.userInfo.headImg;
    session.userInfo.nickName = session.userInfo.nickname;
    WY.ready('user-info',session.userInfo);
    if(!session.userInfo.userName){
      if(localStorage.hasEditSex){
        vueRouter.push('/login/phone');
      }else{
        vueRouter.push('/login/info');
      }
    }
  }
}
function putStorage(session){
  localStorage.sessionId = session.sessionId || localStorage.sessionId || '';
  localStorage.openId = session.openId || localStorage.openId || '';
  localStorage.unionid = session.unionid || session.openId || localStorage.unionid || '';
  localStorage.userId = session.userInfo && session.userInfo.userId || localStorage.userId || '';
}
function login(sts){
  if(!session.userId || !session.userId){
    return wechatLogin();
  }
  if(sts){
    loginFlush();
  }else{
    if(!session.unionid){
      if(location.href.indexOf('192.168')===-1){
        wechatLogin();
      }
    }
  }
}
function wechatLogin(){
  location.href = '/in?callback=' + encodeURIComponent(location.pathname);
}
var hasGetSession;
function getSession(){
  if(hasGetSession)return false;
  hasGetSession = 1;
  WY.get('/session/get',function(a){
      localStorage.apiImgUrl = a.apiImgUrl ;
      localStorage.debug = a.debug  || 0;
      localStorage.hasPing = a.hasPing || '' ;
      putStorage(a.session);
      putSession(a.session);
  },{needAbort:0});
}
function loginFlush(){
  WY.post('/login',{userId:session.userId},function(a){
    if(a.code === 0){
      putStorage(a.data);
      putSession(a.data);
    }else{
      wechatLogin();
    }
  },{needAbort:0})
}
WY.bind('request-status-error',function(status){
  if(status === 401){
    login(1);
  }
});
WY.bind('login',function(){
    login();
});
WY.bind('login-flush',function(){
  loginFlush();
});
WY.bind('session',function(){
  getSession();
});
session.isOwner = function(userId){
  return userId && userId === session.userId || session.userId.split('_')[0] === userId;
};
session.isOwnerProp = function(key , val){
  return val != undefined && val === session[key];
};
session.getBackUrl = function(){
  return session.threeToken && session.threeToken.backUrl;
};
WY.setLocalStorage = function(key , data){
  localStorage[key] = WY.common.stringify(data);
};
WY.getLocalStorage = function(key){
  var v = localStorage[key];
  return v && WY.common.parse(v);
};
