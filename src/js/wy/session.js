var session = WY.session = {};
function putSession(newSession){
  session.sessionId = localStorage.sessionId || '';
  session.openId = localStorage.openId || '';
  session.userId = localStorage.userId || '';
  session.unionid = localStorage.unionid || '';
  session.apiImgUrl = localStorage.apiImgUrl || '';
  session.debug = localStorage.debug || '';
  session.userInfo = newSession.userInfo;
  session.sanfangs = newSession.sanfangs;
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
  if(sts || !session.userId){
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
function getSession(){
  WY.get('/session/get',function(a){
      localStorage.apiImgUrl = a.apiImgUrl;
      localStorage.debug = a.debug ;
      putStorage(a.session);
      putSession(a.session);
  });
}
function loginFlush(){
  WY.post('/login',{userId:session.userId},function(a){
    if(a.code == 0){
      putStorage(a.data);
      putSession(a.data);
    }else{
      wechatLogin();
    }
  })
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
session.isOwner = function(unionid){
  return unionid === session.unionid;
};
WY.setLocalStorage = function(key , data){
  localStorage[key] = JSON.stringify(data);
};
WY.getLocalStorage = function(key){
  var v = localStorage[key];
  return v && JSON.parse(v);
};
