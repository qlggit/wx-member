var login = function(req , res , next){
  req.session.threeToken = {
    backUrl:req.query.backUrl,
  };
  var userId = req.query.userId || '';
  req.session.tokenModel = {
    userId:userId,
    token:req.query.token
  };
  if(req.query.token){
    useSession.save(req , res , next);
  }else{
    res.status(403).end();
  }
};
login.check = function(req , res , next){
  if(req.session.threeToken){
    next();
  }
  else{
    res.status(403).end();
  }
};
module.exports = login;
