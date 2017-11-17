function mongoose (db){
    this.db = db;
}
mongoose.prototype = {
    find:function(data,call,option,types){
        if(!this.db){
            if(call)return call({
                code:1,
                data:'db is null'
            });
            return ;
        }
        if(types){
            this.db.find(data,option||{})
                .sort(types.sort || {})
                .skip(types.skip || 0)
                .limit(types.limit || 20)
                .exec(function(err,data){
                    if(err)useLog.error(err);
                    if(call){
                        call({
                            code:!!err,
                            data:data
                        });
                    }
                });

        }else{
            this.db.find(data,option||{},function(err,data){
                if(err)useLog.error(err);
                if(call){
                    call({
                        code:!!err,
                        data:data
                    });
                }
            });
        }
    },
    save:function(data,call){
        if(!this.db){
            if(call)return call({
                code:1,
                data:'db is null'
            });
            return ;
        }
        var save = new this.db();
        data = data || {};
        for(var i in data){
            save[i] = data[i];
        }
        save.save(function(err , data){
            if(err)useLog.error(err);
            if(call){
                call({
                    code:!!err,
                    data:data
                });
            }
        });
    },
    findOne:function(data,call){
        if(!this.db){
            if(call)return call({
                code:1,
                data:'db is null'
            });
            return ;
        }
        this.db.findOne(data,function(err,data){
            if(err)useLog.error(err);
            if(call){
                call({
                    code:!!err,
                    data:data
                });
            }
        });
    },
    del:function(data,call){
        if(!this.db){
            if(call)return call({
                code:1,
                data:'db is null'
            });
            return ;
        }
        this.db.remove(data,function(err,data){
            if(err)useLog.error(err);
            if(call){
                call({
                    code:!!err,
                    data:data
                });
            }
        });
    },
    update:function(where,data,call){
        if(!this.db){
            if(call)return call({
                code:1,
                data:'db is null'
            });
            return ;
        }
        this.db.update(where,{$set:data},function(err){
            if(err)useLog.error(err);
            if(call){
                call({
                    code:!!err,
                    data:data
                });
            }
        });
    },
    Update:function(where,data,call){
        if(!this.db){
            if(call)return call({
                code:1,
                data:'db is null'
            });
            return ;
        }
        this.db.update(where,data,function(err){
            if(call){
                call({
                    code:!!err,
                    data:data
                });
            }
        });
    }
};
module.exports = mongoose;