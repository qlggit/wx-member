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
    seatOrder:{
        add:apiUrl + '/api/seat/v_1/orderSeat',
        list:apiUrl + '/api/seat/v_1/orderList',
        detail:apiUrl + '/api/seat/v_1/orderDetailList',
    },
    seatInfo:{
        list:apiUrl + '/api/seat/v_1/listSeat',
        backImg:apiUrl + '/api/seat/v_1/getSeatPicInfo',
    },
    file:{
        upload:threeUrl + '/upload',
    },
};
