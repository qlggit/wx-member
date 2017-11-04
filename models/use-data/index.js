global.bankListData = [];
var mongo ;
var permissionInfoDb,permissionMenuDb,permissionDb;
var configDb,shakeDb;
var configData = {};
var allData = {
};
module.exports = {
    getRole:function(findData,call){
        findData.type = 'role';
        permissionInfoDb.find(findData,function(a){
            call(a);
        });
    },
    getMenuList:function(call){
        if(allData.menuList){
            if(call)call(allData.menuList);
        }else{
            permissionMenuDb.find({},function(a){
                allData.menuList = a.data;
                if(call)call(allData.menuList);
            });
        }
    },
    getPermissionList:function(call){
        if(allData.permissionList){
            if(call)call(allData.permissionList);
        }else{
            permissionDb.find({},function(a){
                allData.permissionList = a.data;
                if(call)call(allData.permissionList);
            });
        }
    },
    clearData:function(keys){
        for(var key in allData){
            if(!keys || keys.indexOf(key) > -1)delete allData[key];
        }
    },
    getConfigData:function(type , call){
        if(type && configData[type]){
            return call(configData[type]);
        }
        configDb.find({} , function(a){
            configData = {};
            a.data.forEach(function(o){
                configData[o.type] = JSON.parse(o.content || '{}');
            });
        });
    },
    setConfigData:function(data , call){
        configDb.findOne({type:data.type} , function(a){
            if(a.data){
                configDb.update({type:data.type},{
                    content:data.configData,
                    operator:data.operator,
                    updateTime:new Date
                } , function(a){
                    if(a.code == 0){
                        useData.getConfigData();
                    }
                    call(a);
                })
            }else{
                configDb.save({
                    type:data.type,
                    content:data.configData,
                    operator:data.operator,
                    createTime:new Date,
                    updateTime:new Date
                } , function(a){
                    if(a.code == 0){
                        useData.getConfigData();
                    }
                    call(a);
                })
            }
        });
    },
    getAutoShake:function(call){
        shakeDb.findOne({checked:true},function(a){
            call(a.data)
        });
    },
    getNewShake:function(call){
        shakeDb.findOne({
            type:'spec',
            status:1,
            startTime:{
                $lt:new Date,
            },
            endTime:{
                $gt:new Date,
            }
        },function(a){
            call(a.data);
        });
    },
    init:function(){
        mongo = useMongo();
        permissionInfoDb = mongo.create('permissionInfo');
        permissionMenuDb = mongo.create('permissionMenu');
        permissionDb = mongo.create('permission');
        configDb = mongo.create('config');
        shakeDb = mongo.create('activity');
        this.getMenuList();
        this.getPermissionList();
        this.getConfigData();
    }
};


