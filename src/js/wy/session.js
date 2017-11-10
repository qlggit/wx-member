var session = WY.session = {};
function putSession(){
  session.sessionId = localStorage.sessionId || '';
  session.openId = localStorage.openId || '';
  session.unionid = localStorage.unionid || '';
  session.apiImgUrl = localStorage.apiImgUrl || '';
  session.debug = localStorage.debug || '';
  session.userInfo = WY.common.parse(localStorage.userInfo || '');
  if(session.sessionId)WY.ready('session-complete',session);
  if(session.userInfo){
    if(!session.userInfo.phone){
      //vueRouter.push('/login/phone');
    }
    WY.ready('user-info',session.userInfo);
  }
}
function putStorage(session , userInfo){
  userInfo = userInfo || session.userInfo;
  if(userInfo){
    userInfo.openId = userInfo.openId || userInfo.h5OpenId;
    userInfo.headImg = WY.getHeadImg(userInfo.headImg);
    localStorage.userInfo = WY.common.stringify(userInfo);
  }
  localStorage.sessionId = session.sessionId || '';
  localStorage.openId = session.openId || localStorage.openId || '';
  localStorage.unionid = session.unionid || localStorage.unionid || '';
}
function login(){
  if(session.unionid){
    if(session.userInfo && localStorage.loginTime && Date.now() - localStorage.loginTime < 20 * 60 * 1000){
      //return false;
    }
    WY.post('/login',{unionid:session.unionid},function(a){
      if(a.code == 0){
        localStorage.loginTime = Date.now();
        putStorage(a.data , a.data);
        putSession();
      }
    })
  }else{
    //location.href = '/in?callback=' + encodeURIComponent(location.pathname);
  }
}
function getSession(){
  WY.get('/session/get',function(a){
      localStorage.apiImgUrl = a.apiImgUrl || localStorage.apiImgUrl;
      localStorage.debug = a.debug || localStorage.debug;
      putStorage(a.session);
      putSession();
  });
}
function loginFlush(){
  WY.get('/user/info',function(a){
    if(a.code == 0){
      putStorage(a.data , a.data);
      putSession();
    }
  });
}
WY.bind('request-status-error',function(status){
  if(status == 401){
    login();
  }
});
WY.bind('login',function(status){
    login();
});
WY.bind('login-flush',function(status){
  loginFlush();
});
WY.bind('session',function(status){
  getSession();
});
session.isOwner = function(unionid){
  return unionid == session.unionid;
};
WY.setLocalStorage = function(key , data){
  localStorage[key] = JSON.stringify(data);
};
WY.getLocalStorage = function(key){
  var v = localStorage[key];
  return v && JSON.parse(v);
};
