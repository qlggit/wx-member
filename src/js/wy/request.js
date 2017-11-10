WY.request = function(options){
  if(location.port !== '3001'){
    options.url = 'http://127.0.0.1:3001'+options.url;
  }
  WY.trigger('request-start-filter',options);
  options = Object.assign({
    method:'GET',
    headers:{}
  },options);
  options.method = options.method.toUpperCase();
  var xmlHttp=new XMLHttpRequest();
  var readyState = 0;
  function state_Change(){
    if(xmlHttp.readyState >= readyState){
      readyState = xmlHttp.readyState;
      if (xmlHttp.readyState==4){
        if(xmlHttp.status == 200){
          options.success && options.success(WY.common.parse(xmlHttp.responseText));
          WY.trigger('request-success' , xmlHttp.readyState , readyState)
        }else{
          options.error && options.error({
            state:xmlHttp.readyState,
            status:xmlHttp.status,
            readyState:readyState
          },WY.common.parse(xmlHttp.responseText));
          WY.trigger('request-status-error' , xmlHttp.status, WY.common.parse(xmlHttp.responseText));
        }
        WY.trigger('request-complete' , {
          state:xmlHttp.readyState,
          status:xmlHttp.status,
          readyState:readyState
        } , WY.common.parse(xmlHttp.responseText))
      }
    }else{
      options.error && options.error({
        state:xmlHttp.readyState,
        readyState:readyState
      });
      WY.trigger('request-state-error' , xmlHttp.readyState , readyState);
      WY.trigger('request-complete' , {
        state:xmlHttp.readyState,
        status:0,
        readyState:readyState
      } , WY.common.parse(xmlHttp.responseText))
    }
  }
  xmlHttp.onreadystatechange=state_Change;
  var data;
  if(options.file){
    data = new FormData();
    if(options.data)for(var key in options.data){
      var val = options.data[key];
      data.append(key , val);
    }
  }
  else if(options.method == 'POST'){
    options.headers['Content-Type']='application/json; charset=utf-8';
    data = WY.common.stringify(options.data);
  }
  else{
    options.url = WY.common.addUrlParam(options.url , options.data);
  }
  xmlHttp.ontimeout = function(){
    options.error && options.error({
      state:0,
      status:0,
      readyState:0,
      message:'请求超时'
    });
    options.complete && options.complete({
      code:504,
      state:0,
      status:0,
      readyState:0,
      message:'请求超时'
    });
    WY.trigger('request-time-out');
  };
  xmlHttp.timeout = options.timeout || 60000;
  xmlHttp.open(options.method,options.url,true);
  if(options.headers){
    for(var key in options.headers){
      xmlHttp.setRequestHeader(key , options.headers[key]);
    }
  }
  xmlHttp.send(data);
  return xmlHttp;
};
WY.get = function(url , data , call){
  if(typeof data == 'function' && !call){
    call = data;
    data = {};
  }
  return WY.request({
    url:url,
    data:data,
    success:call
  });
};
WY.post = function(url , data , call){
  if(typeof data == 'function' && !call){
    call = data;
    data = {};
  }
  return WY.request({
    url:url,
    method:'POST',
    data:data,
    success:call
  });
};
WY.postFile = function(url , data , call , error){
  if(typeof data == 'function' && !call){
    call = data;
    data = {};
  }
  var timeout = data.timeout || 60 * 1000;
  delete data.timeout;
  return WY.request({
    url:url,
    method:'POST',
    file:true,
    timeout:timeout,
    data:data,
    success:call,
    error:error
  });
};

