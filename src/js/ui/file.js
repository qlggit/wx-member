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
}
