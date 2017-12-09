var apiUrl = useConfig.get('apiUrl') ;
var threeUrl = useConfig.get('threeUrl') ;
module.exports = {
    sms:{
        send:apiUrl + '/api/sms/v_1/send',
        check:apiUrl + '/api/sms/v_1/invalidSms',
    },
    login:{
      login:apiUrl + '/api/user/v_1/login',
      check:apiUrl + '/api/user/v_1/selectSanfangByUuid',
      info:apiUrl + '/api/user/v_1/infoById',
      build:apiUrl + '/api/user/v_1/bindPhone',
    },
    merchant:{
        banner:apiUrl + '/api/banner/v_1/getBannerList',
        list:apiUrl + '/api/supplier/v_1/list',
        fileList:apiUrl + '/api/supplier/v_1/listFile',
        detail:apiUrl + '/api/supplier/v_1/info',
    },
    user:{
        edit:apiUrl + '/api/user/v_1/updateByPrimaryKey',
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
        lockList:apiUrl + '/api/mgrSeat/v_1/lowCostList',

        money:apiUrl + '/api/mgrSeat/v_1/setAct',
        moneyCancel:apiUrl + '/api/mgrSeat/v_1/cancelAct',
        moneyList:apiUrl + '/api/seat/v_1/actList',

        book:apiUrl + '/api/seat/v_1/book',
        bookCancel:apiUrl + '/api/mgrSeat/v_1/bookCancel',
        bookList:apiUrl + '/api/seat/v_1/bookList',
    },
    file:{
        upload:threeUrl + '/upload',
    },
    product:{
        list:apiUrl + '/api/goods/v_1/list',
        category:apiUrl + '/api/goods/v_1/listGoodsType',
    },
    order:{
        add:apiUrl + '/api/shopping/v_1/orderGoods',
        info:apiUrl + '/api/shopping/v_1/orderDetail',
        list:apiUrl + '/api/shopping/v_1/list',
        infoBySeat:apiUrl + '/api/shopping/v_1/orderGoodsInfo',
        cancel:apiUrl + '/api/shopping/v_1/cancel',
    },
    city:{
        patent:apiUrl + '/api/area/v_1/list',
        child:apiUrl + '/api/area/v_1/childList',
    },
    pay:{
        do:apiUrl + '/api/pay/v_1/pay'
    },
};
