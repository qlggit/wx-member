var apiUrl = useConfig.get('apiUrl') ;
var h5Api = useConfig.get('h5Api') ;
module.exports = {
    sms:{
        send:apiUrl + '/api/sms/v_1/send',
        check:apiUrl + '/api/sms/v_1/invalidSms',
    },
    login:{
      login:apiUrl + '/api/user/v_1/login',
      check:apiUrl + '/api/user/v_1/selectSanfangByUuid',
      info:apiUrl + '/api/user/v_1/infoById',
      infoByUid:apiUrl + '/api/user/v_1/infoByuId',
      infoByUserId:apiUrl + '/api/user/v_1/infoByuserId',
      build:apiUrl + '/api/user/v_1/bindPhone',
      bindUser:apiUrl + '/api/user/v_1/bindUser',
    },
    merchant:{
        banner:apiUrl + '/api/banner/v_1/getBannerList',
        list:apiUrl + '/api/supplier/v_1/list',
        fileList:apiUrl + '/api/supplier/v_1/listFile',
        detail:apiUrl + '/api/supplier/v_1/info',
    },
    user:{
        edit:apiUrl + '/api/user/v_1/updateByPrimaryKey',
      rongToken:apiUrl + '/api/user/v_1/getRongYunToken',
    },
    my:{
        seat:apiUrl + '/api/seat/v_1/myOrderList',
        order:apiUrl + '/api/shopping/v_1/orderList',
    },
    seatOrder:{
        add:apiUrl + '/api/seat/v_1/orderSeat',
        pz:apiUrl + '/api/seat/v_1/reqPz',
        list:apiUrl + '/api/seat/v_1/orderList',
        info:apiUrl + '/api/seat/v_1/info',
        myInfo:apiUrl + '/api/seat/v_1/orderInfo',
        detail:apiUrl + '/api/seat/v_1/orderDetailList',
        cancel:apiUrl + '/api/seat/v_1/cancelSeat',

        pzlist:apiUrl + '/api/seat/v_1/pzRecordLs',
    },
    seatInfo:{
        list:apiUrl + '/api/seat/v_1/listSeat',
        backImg:apiUrl + '/api/seat/v_1/lisSeatPic',
        addBack:apiUrl + '/api/seat/v_1/uploadSeatPic',
        add:apiUrl + '/api/seat/v_1/addSeat',
        edit:apiUrl + '/api/seat/v_1/editSeat',

        lock:apiUrl + '/api/mgrSeat/v_1/lockSeat',
        lockCancel:apiUrl + '/api/mgrSeat/v_1/lockCancel',
        lockList:apiUrl + '/api/mgrSeat/v_1/lockList',

        money:apiUrl + '/api/mgrSeat/v_1/setLowcost',
        moneyCancel:apiUrl + '/api/mgrSeat/v_1/lowcostCancel',
        moneyList:apiUrl + '/api/mgrSeat/v_1/lowcostList',

        book:apiUrl + '/mgr/orders/offline/v_1/add',
        bookCancel:apiUrl + '/mgr/orders/offline/v_1/cancel',
        bookList:apiUrl + '/mgr/orders/offline/v_1/list',
    },
    file:{
        upload:h5Api + '/file/upload',
    },
    product:{
        list:apiUrl + '/mgr/goods/v_1/list',
        category:apiUrl + '/api/goods/v_1/listGoodsType',
    },
    order:{
        add:apiUrl + '/api/shopping/v_1/orderGoods',
        info:apiUrl + '/api/shopping/v_1/orderDetail',
        list:apiUrl + '/api/shopping/v_1/list',
        infoBySeat:apiUrl + '/api/shopping/v_1/orderGoodsInfo',
        cancel:apiUrl + '/api/seat/v_1/cancelSeat',
    },
    city:{
        patent:apiUrl + '/api/area/v_1/list',
        child:apiUrl + '/api/area/v_1/childList',
    },
    pay:{
        do:apiUrl + '/api/pay/v_1/pay'
    },
    wine:{
        merchantList:apiUrl + '/api/wine/v_1/mySuppliers'
    },
    message:{
        wine:apiUrl + '/api/msg/v_1/myAccessWine',
        act:apiUrl + '/api/msg/v_1/myAct',
        pay:apiUrl + '/api/msg/v_1/myPay',
        pz:apiUrl + '/api/msg/v_1/myPzList',
        sys:apiUrl + '/api/msg/v_1/sysMsg',
    },
};
