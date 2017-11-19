function canvasImgData(options){
  this.options = options;
  this.init();
}
canvasImgData.prototype = {
  init:function(){
    var options = this.options;
    var canvas = this.canvas = document.createElement('canvas');
    canvas.setAttribute('width',options.width);
    canvas.setAttribute('height',options.height);
    var ctx = this.ctx = canvas.getContext('2d');
    var xhr = new XMLHttpRequest();
    console.log(options.img);
    xhr.open('get', options.img, true);
    xhr.responseType = 'blob';
    var that = this;
    xhr.onload = function() {
      if(xhr.status === 200){
        var blob = xhr.response;
        var url = URL.createObjectURL(blob);
        console.log(url);
        var img = new Image;
        img.src = url;
        img.onload = function(){
          console.log(img);
          ctx.drawImage(img,0,0);
          that.imgData = ctx.getImageData(0,0,options.width,options.height).data;
          that.borders = [];
          console.log(that.imgData);
          that.doSearch();
        }
      }
    };
    xhr.send();
  },
  doSearch:function(){
    var imgData = this.imgData;
    var dataLength = this.imgData.length;
    for(var i=0;i<dataLength;i+=4){
      if(imgData[i] === imgData[i+1] && imgData[i] === imgData[i+2]){
        this.doCheck(i,imgData[i]);
      }
    }
    var options = this.options;
    options.done && options.done();
  },
  doCheck:function(i , color){
    var options = this.options;
      if(options.colorList.indexOf(color) > -1){
          var offset = this.getOffset(i);
          if(!this.inBorder(offset)){
              var border = this.getBorder(offset , color);
              if(border.width < 10 || border.height < 10)return false;
              this.borders.push(border);
              options.border && options.border(color , border);
          }
      }
  },
  getOffset:function(i){
    var index = i/4;
    var x = index % this.options.width;
    var y = Math.floor(index / this.options.width);
    return {
      x:x,
      y:y
    }
  },
  getBorder:function(offset , color){
    var x = offset.x,y = offset.y;
    x++;
    for(;x<=this.options.width;x++){
      var index = (y*this.options.width + x) * 4;
      if(this.imgData[index] === color && this.imgData[index+1] === color && this.imgData[index+2] === color){
        continue;
      }
      {
        x--;
        break;
      }
    }
    y++;
    for(;y<=this.options.height;y++){
      var index = (y*this.options.width + x) * 4;
      if(this.imgData[index] === color && this.imgData[index+1] === color && this.imgData[index+2] === color){
        continue;
      }
      y--;
      break;
    }
    return {
      left:offset.x,
      top:offset.y,
      width:x-offset.x,
      height:y-offset.y,
      right:x,
      bottom:y,
    }
  },
  inBorder:function(offset){
    return !this.borders.every(function(a){
      if(offset.x >= a.left
        &&  offset.x<= a.right
        && offset.y >= a.top
        && offset.y <= a.bottom
      ){
        return false
      }
      return true;
    });
  }
};
export default  canvasImgData;
