var sendUrl = useConfig.get('sendUrl') ;
var apiUrl = useConfig.get('apiUrl') ;
module.exports = {
    sms:{
        send:sendUrl + '/router/rest'
    },
    login:{
        reg:sendUrl + '/router/rest'
    },
    merchant:{
        search:apiUrl + '/v1/app/main/list',
    },
};
