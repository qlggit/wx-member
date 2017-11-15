module.exports = {
    operator:{
        username:String,
        password:String,
        loginTime:Date,
        loginCount:Number,
        errorCount:Number,
        type:Number,
        status:Number,
        roleId:Array,
        createTime:Date,
        updateTime:Date
    },
    permission:{
        name:String,
        code:String,
        menuCode:String,
        createTime:Date,
        updateTime:Date,
    },
    permissionInfo:{//group role
        name:String,
        type:String,
        permissionCode:Array,
        groupId:Array,
        menuCode:Array,
        createTime:Date,
        updateTime:Date,
    },
    permissionMenu:{
        name:String,
        code:String,
        parentCode:String,
        createTime:Date,
        updateTime:Date,
    }
    ,
    advert:{
        name:String,
        headImg:String,
        jumpUrl:String,
        type:String,
        sort:Number,
        operator:String,
        createTime:Date,
    }
    ,
    config:{
        type:String,
        content:String,
        operator:String,
        createTime:Date,
        updateTime:Date,
    }
    ,
    activity:{
        name:String,
        type:String,
        checked:Boolean,
        startTime:Date,
        endTime:Date,
        status:Number,
        operator:String,
        createTime:Date,
        updateTime:Date,
    },
    activityDetail:{
        activityId:String,
        name:String,
        type:String,
        number:String,
        productId:String,
        productName:String,
        headImg:String,
        sort:Number,
        dayStock:Number,
        allStock:Number,
        userStock:Number,
        allPlusStock:Number,
        chance:Number,
        checked:Boolean,
        operator:String,
        createTime:Date,
        updateTime:Date,
    },
    activityList:{
        activityId:String,
        userId:String,
        phone:String,
        shakeId:String,
        prizeName:String,
        productId:String,
        productName:String,
        number:Number,
        headImg:String,
        autoId:String,
        remark:String,
        content:String,
        type:String,
        productType:String,
        date:String,
        createTime:Date,
    },
    withdraw:{
        userId:String,
        name:String,
        phone:String,
        money:String,
        score:String,
        type:String,
        status:Number,
        account:String,
        createTime:Date,
        updateTime:Date,
    },
    changeStatusDetail:{//记录改变相关数据状态的操作记录
        type:String,
        itemType:String,
        relationId:String,
        operator:String,
        baseStatus:String,
        changeStatus:String,
        remark:String,
        createTime:Date,
    },
};