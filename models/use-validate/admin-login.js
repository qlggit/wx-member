var login = function(req , res , next){
  req.session.adminToken = {
    backUrl:req.query.backUrl,
    userId:req.query.userId,
    token:req.query.token
  };
  if(req.query.token){
    useSession.save(req , res , next);
  }else{
    res.status(403).end();
  }
};
login.check = function(req , res , next){
  if(req.session.adminToken){
    next();
  }
  else{
    res.status(403).end();
  }
};
module.exports = login;
