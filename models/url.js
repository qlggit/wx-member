var sendUrl = useConfig.get('sendUrl') ;
var apiUrl = useConfig.get('apiUrl') ;
var webUrl = useConfig.get('webUrl') ;
module.exports = {
    sms:{
        send:sendUrl + '/router/rest'
    },
    login:{
        reg:sendUrl + '/router/rest'
    },
    withdraw:{
        list:webUrl + '/yqswb/api/wbShopTx/withdraw',
        change:webUrl + '/yqswb/api/wbShopTx/dealWithdraw',
    },
    file:{
        upload:apiUrl + '/yqsapi/api/app/file/fileUpload',
    },
};