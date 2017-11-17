global.bankListData = [];
module.exports = {
  setUserInfo:function(req , res , data , call){
    data = data.data || {};
    req.session.tokenModel = data.tokenModel || req.session.tokenModel;
    req.session.sanfangs = data.sanfangs && data.sanfangs.filter(function(a){return a.sType === 'WEIXIN'}).pop() || req.session.sanfangs;
    delete data.tokenModel;
    delete data.sanfangs;
    req.session.userInfo = data;
    req.session.openId = req.session.openId || (data.openId || '');
    req.session.unionid = req.session.unionid || (data.uid || '');
    useSession.save(req , res , call);
  }
};


