var login = function(req , res , next){
  req.session.threeToken = {
    backUrl:req.query.backUrl,
    userId:req.query.userId,
    token:req.query.token
  };
  console.log('three-login login');
  console.log(req.session);
  if(req.query.token){
    useSession.save(req , res , next);
  }else{
    res.status(403).end();
  }
};
login.check = function(req , res , next){
  console.log('three-login check');
  console.log(req.session);
  if(req.session.threeToken){
    next();
  }
  else{
    res.status(403).end();
  }
};
module.exports = login;
