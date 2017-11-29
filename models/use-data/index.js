var cacheData={};
module.exports = {
  setUserInfo:function(req , res , data , call){
    data = data.data || {};
    req.session.tokenModel = data.tokenModel || req.session.tokenModel;
    req.session.sanfangs = data.sanfangs && data.sanfangs.filter(function(a){return a.sType === 'WEIXIN'}).pop() || req.session.sanfangs;
    delete data.tokenModel;
    delete data.sanfangs;
    data.userId = req.session.tokenModel && req.session.tokenModel.userId;
    req.session.userInfo = data;
    req.session.openId = req.session.openId || (data.openId || '');
    req.session.unionid = req.session.unionid || (data.uid || '');
    useSession.save(req , res , call);
  },
  getAreaData:function(req , res ,call){
     var cache = cacheData.areaData;
     var date = useCommon.parseDate(new Date , 'Ymd');
     if(cache){
        call(cache.data);
        if(cache.date === date){
          return;
        }
     }
     var spec = ['110000','120000','500000','310000'];//直辖市不需要继续查
     useRequest.send(req , res ,{
        url:useUrl.city.patent,
       done:function(data){
          if(data.code === 0){
            var parentData = data.data;
            parentData = parentData.filter(function(a){
              //去除港澳台
              return ['710000','810000','820000'].indexOf(a.areaCode) === -1
            });
            var all = [];
            var childData = [];
            parentData.forEach(function(a){
              if(spec.indexOf(a.areaCode) === -1){
                all.push(new Promise(function(rev , rej){
                  useRequest.send(req , res , {
                    url:useUrl.city.child,
                    data:{
                      parentCode:a.areaCode,
                    },
                    done:function(o){
                      if(o.code === 0){
                        childData = childData.concat(o.data);
                        rev();
                      }else rej();

                    }
                  })
                }));
              }else{
                childData.push(a);
              }
            });
            Promise.all(all).then(function(){
              cacheData.areaData = {
                data:childData,
                date:date,
              };
              call && call(childData);
            }).catch(function(){
              call && call([]);
            })
          }
          else{
            call && call([]);
          }
       }
     })
  },
  init:function(){
    this.getAreaData({session:{}},{},function(){});
  }
}
;


