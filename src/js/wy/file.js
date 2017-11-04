WY.getFileUrl = function(file , call){
  var url;
  try{
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
      url = this.result;
      next();
    }
  }catch(e){
    try{
      if(window.URL){
        url = URL.createObjectURL(file);
      }else{
        url = webkitURL.createObjectURL(file);
      }
    }catch (e){

    }
    next();
  }
  function next(){
    call && call(url);
  }
};
WY.xhrProgress = function(xhr,call){
  var startTime,total,loaded,lastLoad,lastTime,thisTime;
  var totalSize,speed;
  console.log(xhr);
  function onprogress(event){
    if(event.lengthComputable){
      if(!total){
        total = event.total;
        totalSize = reSize(total);
      }
      speed = (event.loaded - lastLoad)*1000/(event.timeStamp - lastTime);
      lastTime = event.timeStamp;
      lastLoad = event.loaded;
      showMessage();
    }
  }
  function onloadstart(event){
    startTime = lastTime = event.timeStamp;
    total = event.total;
    totalSize = reSize(total);
    loaded = event.loaded;
    lastLoad = event.loaded;
    showMessage(1);
  }
  xhr.upload.onloadstart  = xhr.onloadstart = onloadstart;
  xhr.upload.onloadend  = xhr.onloadend = function(event){
  };
  xhr.upload.onload  = xhr.onload = function(event){
  };
  xhr.upload.onprogress = xhr.onprogress = onprogress;
  xhr.upload.onerror = xhr.onerror = function(event){
    call && call({
      code:1,
      event:event
    })
  };
  function reSize(size){
    if(size < 1024){
      return size + 'B';
    }
    if(size < 1024 * 1024){
      return (size / 1024).toFixed(2) + 'KB';
    }
    if(size < 1024 * 1024 * 1024){
      return (size / 1024 / 1024).toFixed(2) + 'MB';
    }
    return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB';
  }
  function showMessage(sts){
    call && call({
      uploadSize:reSize(loaded)+'/' + totalSize ,
      uploadProp:sts?0:(loaded * 100/total).toFixed(2),
      uploadSpeed:(sts?0:(reSize(speed)+'/s')),
      uploadTime:(sts?0:WY.common.sumTime(lastTime)),
      moreTime:((sts || speed == 0 )?'--':(WY.common.sumTime(total - loaded) / speed))
    });
  }
};
