function mySvg(svg , svgData){
  this.ele = svg;
}
mySvg.create = function(){
};
mySvg.prototype = {
  create:function(e , options){
    options = options || {};
    var ele = document.createElementNS("http://www.w3.org/2000/svg",e);
    if(options.attr){
      for(var key in options.attr){
        ele.setAttribute(key , options.attr[key]);
      }
    }
    var styles = [];
    if(options.style){
      for(var key in options.style){
        styles.push(key + ':' + options.style[key]);
      }
      ele.style = styles.join(';');
    }
    return ele;
  },
  add:function(e,options){
    var ele = this.create(e,options);
    ele.svgOptions = options;
    this.push(ele , options.parent);
    return ele;
  },
  push:function(e , p){
    (p || this.ele).appendChild(e);
  },
  remove:function(e,p){
    (p || this.ele).removeChild(e);
  }
};
function seatSvg(options){
  this.options = options;
  var svgObj = this.svgObj = new mySvg(options.svg);
  this.roomG = svgObj.add('g',{});
  this.tableG = svgObj.add('g',{});
  this.chairG = svgObj.add('g',{});
  this.allSvgData = [];
  this.svg = options.svg;
  this.scale = 1;
  this.minScale = .5;
  this.maxScale = 3;
  this.clientWidth = this.svg.parentElement.clientWidth ;
  this.clientHeight = this.svg.parentElement.clientHeight;
  this.allWidth = this.options.width;
  this.allHeight = this.options.height;
  this.parentOffset = {
    top:this.svg.parentElement.offsetTop,
    left:this.svg.parentElement.offsetLeft,
  };
  var that = this;
  if(options.canvas){
    this.ctx = options.canvas.getContext('2d');
    this.imgData = options.imgData;
  }
  this.init();
  this.setData();
}
seatSvg.prototype = {
  setData:function(){
    var options = this.options;
    var that = this;
    if(options.itemList){
      options.itemList.forEach(function(a){
        var ele = that[(
          {
            room:'addRoom',
            table:'addTable',
            chair:'addChair',
          }
        )[a.type]](a.svgData);
        ele.onclick = function(e){
          options.click && options.click(e ,a.type, a.svgData);
          e.stopPropagation && e.stopPropagation();
        }
        that.allSvgData.push(ele);
      });
    }
  },
  init:function(){
    var options = this.options;
    this.svg.onclick = function(e){
      options.click && options.click(e ,'svg');
    };
    var parentEvent = this.svg.parentElement;
    var that = this;
    parentEvent.addEventListener('mousewheel' , function(e){
      that.setScale(e.deltaY , e.pageX, e.pageY);
    } , false);
    parentEvent.addEventListener('dbclick' , function(e){
      that.setScale(1, e.pageX, e.pageY);
    } , false);
    var isMouseDown,autoX,autoY,marginLeft,marginTop;
    var touchLength;
    this.bind('mousedown touchstart' ,parentEvent,function(e){
      isMouseDown = true;
      if(e.targetTouches){
        if(e.targetTouches.length === 2){
          touchLength = that.getTouchLength(e.targetTouches[0],e.targetTouches[1]);
          return false;
        }
        e = e.targetTouches[0];
        that.addScale(e.pageX,e.pageY);
      }
      autoX = e.pageX ;
      autoY = e.pageY ;
      marginLeft = parseFloat(that.svg.style.marginLeft || 0);
      marginTop = parseFloat(that.svg.style.marginTop || 0);
    });
    this.bind('mousemove touchmove' ,parentEvent,function(e){
      that.cancelScale();
      if(isMouseDown){
        if(e.targetTouches){
          if(e.targetTouches.length === 2){
            var newTouchLength = that.getTouchLength(e.targetTouches[0],e.targetTouches[1]);
            var touchCenter = that.getTouchCenter(e.targetTouches);
            that.setScale(newTouchLength - touchLength , touchCenter.x, touchCenter.y);
            touchLength = newTouchLength;
            return false;
          }
          e = e.targetTouches[0];
        }
        var ml = marginLeft + e.pageX - autoX;
        var mt = marginTop + e.pageY - autoY;
        that.setMarginLeft(ml);
        that.setMarginTop(mt);
      }
      e.stopPropagation && e.stopPropagation()
    });
    this.bind('mouseup mouseout mouseleave touchend touchcancel' ,parentEvent,function(e){
      that.cancelScale();
      isMouseDown = 0;
    });
  },
  setMarginTop:function(mt){
    if(mt<0){
      if(this.allHeight < this.clientHeight){
        mt = 0;
      }
      else if(mt < this.clientHeight - this.allHeight){
        mt = this.clientHeight - this.allHeight;
      }
    }
    else if(mt > 0){
      if(this.allHeight > this.clientHeight){
        mt = 0
      }
      if(this.allHeight < this.clientHeight && mt+this.allHeight > this.clientHeight){
        mt = this.clientHeight - this.allHeight;
      }
    }
    this.svg.style.marginTop = mt + 'px';
  },
  setMarginLeft:function(mt){
    if(mt<0){
      if(this.allWidth < this.clientWidth){
        mt = 0;
      }
      else if(mt < this.clientWidth - this.allWidth){
        mt = this.clientWidth - this.allWidth;
      }
    }
    else if(mt > 0){
      if(this.allWidth > this.clientWidth){
        mt = 0
      }
      if(this.allWidth < this.clientWidth && mt+this.allWidth > this.clientWidth){
        mt = this.clientWidth - this.allWidth;
      }
    }
    this.svg.style.marginLeft = mt + 'px';
  },
  addScale:function(x , y){
    this.doScaleTimer = setTimeout(function(){
      this.setScale(1 , x , y);
    }.bind(this),600);
  },
  cancelScale:function(){
    clearTimeout(this.doScaleTimer);
  },
  getTouchCenter:function(e){
    return {
      x:(e[0].pageX+e[1].pageX)/2,
      y:(e[0].pageY+e[1].pageY)/2,
    }
  },
  getTouchLength:function(e1,e2){
    return Math.sqrt((e1.pageX-e2.pageX) * (e1.pageX-e2.pageX) + (e1.pageY-e2.pageY) * (e1.pageY-e2.pageY))
  },
  bind:function(type ,ele , func){
    type.split(' ').forEach(function(a){
      ele.addEventListener(a , func , false);
    })
  },
  setScale:function(sts , x , y){
    x-= this.parentOffset.left;
    y-= this.parentOffset.top;
    var autoScale = this.scale;
    var scale = (this.scale + (sts>0?.1:-.1)).toFixed(1)-0;
    if(scale < this.minScale || scale > this.maxScale)return false;
    this.scale = scale;
    this.allWidth = this.options.width * scale;
    this.allHeight = this.options.height * scale;
    var ml =  x - parseFloat(this.svg.style.marginLeft || 0);
    var mt =  y - parseFloat(this.svg.style.marginTop || 0);
    this.svg.style.width = this.allWidth + 'px';
    this.svg.style.height = this.allHeight + 'px';
    this.svg.style.marginLeft = x - ml * scale / autoScale    + 'px';
    this.svg.style.marginTop = y - mt * scale / autoScale   + 'px';
  },
  addRoom:function(svgData){
    return this.svgObj.add('rect',{
      parent:this.getParent('room'),
      attr:{
        width:svgData.width,
        height:svgData.height,
        x:svgData.x,
        y:svgData.y
      },
      style:{
        fill:this.getColor('room'),
      }
    });
  },
  addTable:function(svgData){
    return this.svgObj.add('rect',{
      parent:this.getParent('table'),
      attr:{
        width:svgData.width,
        height:svgData.height,
        x:svgData.x,
        y:svgData.y
      },
      style:{
        fill:this.getColor('table'),
      }
    });
  },
  addChair:function(svgData){
    return this.svgObj.add('rect',{
      parent:this.getParent('chair'),
      attr:{
        width:svgData.width,
        height:svgData.height,
        x:svgData.x,
        y:svgData.y
      },
      style:{
        fill:this.getColor('chair'),
      }
    });
  },
  targetActive:function(){
    this.targetEle.style.stroke = 'red';
  },
  setItemList:function(itemList){
    this.options.itemList = itemList;
    this.setData();
  },
  removeItem:function(item){
    var removes;
    if(item){
      removes.push(item);
      var index = this.allSvgData.indexOf(item);
      this.allSvgData.splice(index,1);
    }else{
      removes = this.allSvgData;
    }
    removes.forEach(function(a){
        a.parentElement && a.parentElement.removeChild(a);
    });
    removes.splice(0);
  },
  getParent:function(category){
    return ({
      room:this.roomG,
      table:this.tableG,
      chair:this.chairG
    })[category];
  },
  getColor:function(category){
    return ({
      room:'rgb(0,255,255)',
      table:'rgb(255,255,0)',
      chair:'rgb(255,0,255)'
    })[category];
  },
};
export default seatSvg;
