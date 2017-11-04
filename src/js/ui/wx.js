WY.bind('wx-jssdk',function(){
  WY.post('/wechat/jssdk',{
    url:location.href
  } , function(a){
    if(a.code == 0){
      var data = a.data;
      wx.config({
        debug: WY.session.debug - 0, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp:data.timestamp , // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: ['previewImage','getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    }
  });
});
wx.error(function(){
  WY.trigger('location-error');
});
WY.bind('location-error',function(){
  if(WY.session.debug - 0)WY.request({
    url: '/geocoder',
    data: {
      location:'29.56301,106.551557'
    },
    success:function(a){
      if(a.code == 0){
        WY.ready('wy-location' , {
          address:a.data.formatted_address,
          latitude:'29.56301',
          longitude:'106.551557',
          bdLocation:a.data.location
        })
      }
    }
  })
});
wx.ready(function(){
  WY.trigger('get-location');
});
WY.bind('get-location' , function(){
  wx.getLocation({
    type: 'gcj02',
    success: function (res) {
      WY.request({
        url: '/geocoder',
        data: {
          location:[res.latitude , res.longitude].join()
        },
        success:function(a){
          if(a.code == 0){
            WY.ready('wy-location' , {
              address:a.data.formatted_address,
              latitude:res.latitude,
              longitude:res.longitude,
              bdLocation:a.data.location
            })
          }
        }
      })
    },
    fail:function(){
      WY.trigger('location-error');
    }
  });
});
WY.bind('require-complete',function(){
  WY.trigger('wx-jssdk');
});

