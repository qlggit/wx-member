WY.bind('wx-jssdk',function(){
  WY.post('/wechat/jssdk',{
    url:location.href
  } , function(a){
    if(a.code === 0){
      var data = a.data;
      wx.config({
        debug: WY.session.debug - 0,
        appId: data.appId,
        timestamp:data.timestamp ,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
          'previewImage',
          'getLocation',
          'scanQRCode',
          'openLocation',
          'closeWindow',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
        ]
      });
    }
  },{needAbort:0});
});
wx.error(function(){
  WY.trigger('location-error');
});
WY.openLocation = function(data){
  var gps = wgs84togcj02(data.longitude-0,data.latitude-0);
  wx.openLocation({
    latitude: gps[1], // 纬度，浮点数，范围为90 ~ -90
    longitude: gps[0], // 经度，浮点数，范围为180 ~ -180。
    name: data.name, // 位置名
    address:data.address, // 地址详情说明
  });
};
WY.bind('location-error-wgs84',function(){
  if(/127|192/.test(location.href)){
    WY.ready('wx-location-wgs84',{
      longitude:29.56301,
      latitude:106.551557
    });
  }
});
WY.bind('location-error' , function(){
  WY.trigger('location-error-wgs84');
  WY.trigger('location-error-gcg02');
});
var hasGetLocation;
wx.ready(function(){
  WY.ready('user-info' , function(){
    if(!hasGetLocation)WY.trigger('get-location');
    hasGetLocation = 1;
  });
  WY.ready('wx-ready');
});
WY.bind('get-location' , function(){
  //res.latitude , res.longitude
  if(localStorage.gcj02Res){
    WY.ready('wx-location-gcg02', WY.common.parse(localStorage.gcj02Res));
    return false;
  }
  wx.getLocation({
    type: 'gcj02',
    success: function (res) {
      localStorage.gcj02Res = JSON.stringify(res);
      WY.ready('wx-location-gcg02', res);
    },
    fail:function(){
      WY.trigger('location-error');
    }
  });
});
WY.bind('get-location' , function(){
  if(localStorage.wgs84Res){
    WY.ready('wx-location-wgs84', WY.common.parse(localStorage.wgs84Res));
    return false;
  }
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      localStorage.wgs84Res = JSON.stringify(res);
      WY.ready('wx-location-wgs84', res);
    },
    fail:function(){
      WY.trigger('location-error');
    }
  });
});
var hasWXinit;
WY.bind('router-change-after',function(data){
  //第一次 或者地址改变之后 重新注册jssdk
  if(!hasWXinit || data.beforeHref !== data.afterHref){
    WY.trigger('wx-jssdk');
  }
  hasWXinit = 1;
});

