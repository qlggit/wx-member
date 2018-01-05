function mySvg(svg , svgData){
  this.ele = svg;
}
mySvg.create = function(){
};
mySvg.prototype = {
  create:function(e , options , svgData){
    options = options || {};
    var ele = document.createElementNS("http://www.w3.org/2000/svg",e);
    if(options.attr){
      for(var key in options.attr){
        if(e === 'image'){
          if(key === 'href'){
            if(ele.href)ele.href.baseVal = options.attr.href;
            else ele.href = options.attr.href;
            continue;
          }
        }
        if(options.attr[key])ele.setAttribute(key , options.attr[key]);
      }
      //autoHeight用传入大小
      if(!options.autoHeight && e === 'image' && options.attr.href){
        var img = new Image;
        img.src = options.attr.href;
        img.onload = function(){
          svgData.width = img.width;
          svgData.height = img.height;
          ele.setAttribute('width' , img.width);
          ele.setAttribute('height' , img.height);

        }
      }
    }
    var styles = [];
    if(options.style){
      options.style.backgroundSize = '100% 100%';
      for(var key in options.style){
        styles.push(key + ':' + options.style[key]);
      }
      ele.style = styles.join(';');
    }
    return ele;
  },
  add:function(e,options,svgData){
    var ele = this.create(e,options,svgData);
    ele.svgOptions = options;
    ele.svgData = svgData;
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
  this.pathG = svgObj.add('g',{});
  this.roomG = svgObj.add('g',{});
  this.tableG = svgObj.add('g',{});
  this.chairG = svgObj.add('g',{});
  this.userInfoG = svgObj.add('g',{});
  this.patterns = {};
  this.selectedPolygon = [];
  this.defs = svgObj.add('defs',{});
  this.allItemData = [];
  this.headImgSvg = [];
  this.svg = options.svg;
  this.scale = 1;
  this.minScale = .05;
  this.maxScale = 1;
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
    if(this.svgObj && options.itemList){
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
        };
        that.allItemData.push(ele);
      });
    }
  },
  makePattern:function(patternId , userInfo , options){
    var pattern = this.svgObj.add('pattern',{
      parent:this.defs,
      attr:{
        width:options.w,
        height:options.h,
        id:patternId,
      }
    });
    this.svgObj.add('image',{
      parent:pattern,
      autoHeight:1,
      attr:{
        width:options.w,
        height:options.h,
        'href':userInfo.headImg,
      }
    });
    this.patterns[patternId] = pattern;
    return pattern;
  },
  setSelected:function(svgData ){
    var obj = this.svgObj.add('path',{
      parent:this.getParent('path'),
      attr:{
        d:[
          'M'+[svgData.x  , svgData.y ].join(' '),
          'L'+[svgData.x  , svgData.y  + svgData.height].join(' '),
          'L'+[svgData.x + svgData.width  , svgData.y  + svgData.height].join(' '),
          'L'+[svgData.x + svgData.width  , svgData.y ].join(' '),
          'L'+[svgData.x  , svgData.y ].join(' '),
          'Z'
        ].join(' '),
      },
      style:{
        'stroke':'red',
        'fill':'white',
      }
    });
    obj.selectedPolygonSeatId = svgData.seatId;
    this.selectedPolygon.push(obj);
    return obj;
  },
  clearSelected:function(svgData){
    if(svgData){
      var selectedPolygon = this.selectedPolygon;
      selectedPolygon.every(function(a , i){
        if(a.selectedPolygonSeatId === svgData.seatId){
          a.parentElement && a.parentElement.removeChild(a);
          selectedPolygon.splice(i , 1);
          return false;
        }
        return true;
      });
      return false;
    }
    this.selectedPolygon.forEach(function(a){
      a.parentElement && a.parentElement.removeChild(a);
    });
    this.selectedPolygon = [];
  },
  clearUserHeadImg:function(svgData){
    var removes,headImgSvg=this.headImgSvg;
    if(svgData){
      removes = this.headImgSvg.filter(function(a , i){
        return a.dataId === 'userInfoHeadImg'+svgData.userId;
      });
      removes.forEach(function(a){
        headImgSvg.every(function(b , i){
          b.parentElement && b.parentElement.removeChild(b);
          if(b.dataId === a.dataId){
            headImgSvg.splice(i , 1);
          }
        });
      });
      return ;
    }
    this.removeList(this.headImgSvg);
  },
  setUserHeadImg:function(svgData , userInfo){
    var id = 'userInfoHeadImg'+userInfo.userId;
    var cr = 15;
    svgData.x -= 0;
    svgData.y -= 0;
    if(this.patterns[id]){

    }else this.makePattern(id , userInfo , {
      w:cr*2,
      h:cr*2,
    });
    var backImgSvg = this.svgObj.add('polygon',{
      parent:this.getParent('userInfo'),
      attr:{
        points:[
          [svgData.x  + cr * 2 - 4 , svgData.y  + cr * 2 + 10].join(),
          [svgData.x  + cr * 2 - 4 , svgData.y  + cr].join(),
          [svgData.x  + 10 , svgData.y  + cr + 5].join(),
        ].join(' '),
      },
      style:{
        'fill':'#181818',
      }
    });
    backImgSvg.dataId = id;
    this.headImgSvg.push(backImgSvg);
    var headImg = this.svgObj.add('circle',{
      parent:this.getParent('userInfo'),
      attr:{
        cx:svgData.x + cr ,
        cy:svgData.y + cr ,
        r:cr,
        'fill':'url(#'+id+')',
        stroke:'#181818',
      }
    });
    headImg.dataId = id;
    this.headImgSvg.push(headImg);
    return headImg;
  },
  init:function(){
    var options = this.options;
    this.svg.onclick = function(e){
      options.click && options.click(e ,'svg');
    };
    var parentEvent = this.svg.parentElement;
    var that = this;
    parentEvent.addEventListener('mousewheel' , function(e){
      that.addScale(e.deltaY>0?-.1:.1  , e.pageX, e.pageY);
    } , false);
    parentEvent.addEventListener('dbclick' , function(e){
      that.addScale(.2, e.pageX, e.pageY);
    } , false);
    var isMouseDown,autoX,autoY,marginLeft,marginTop;
    var touchLength;
    this.bind('mousedown touchstart' ,parentEvent,function(e){
      isMouseDown = true;
      that.cancelScale();
      if(e.targetTouches){
        if(e.targetTouches.length === 2){
          touchLength = that.getTouchLength(e.targetTouches[0],e.targetTouches[1]);
          return false;
        }
        e = e.targetTouches[0];
        //单个点击不做处理
        //that.addTimer = setInterval(that.addTimerScale.bind(that , e.pageX , e.pageY) , 600);
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
            that.addScale((newTouchLength - touchLength) / touchLength , touchCenter.x, touchCenter.y);
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
  addTimerScale:function(x , y){
      this.addScale(.1 , x , y);
  },
  cancelScale:function(){
    clearTimeout(this.addTimer);
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
  addScale:function(scale , x , y){
    x-= this.parentOffset.left;
    y-= this.parentOffset.top;
    scale += this.scale;
    if(scale < this.minScale || scale > this.maxScale)return false;
    this.scale = scale;
    // this.allWidth = this.options.width * scale;
    // this.allHeight = this.options.height * scale;
    // var ml =  x - parseFloat(this.svg.style.marginLeft || 0);
    // var mt =  y - parseFloat(this.svg.style.marginTop || 0);
    // this.svg.style.width = this.allWidth + 'px';
    // this.svg.style.height = this.allHeight + 'px';
    // this.svg.style.marginLeft = x - ml * scale / this.autoScale    + 'px';
    // this.svg.style.marginTop = y - mt * scale / this.autoScale   + 'px';
    this.svg.style.transform = 'scale('+(scale).toFixed(2)+')';
  },
  addRoom:function(svgData){
    return this.svgObj.add('image',{
      parent:this.getParent('room'),
      attr:{
        width:svgData.width,
        height:svgData.height,
        x:svgData.x,
        y:svgData.y,
        'href':svgData.backImg,
      }
    },svgData);
  },
  addTable:function(svgData){
    return this.svgObj.add('image',{
      parent:this.getParent('table'),
      attr:{
        width:svgData.width,
        height:svgData.height,
        x:svgData.x,
        y:svgData.y,
        'href':svgData.backImg,
      }
    },svgData);
  },
  addChair:function(svgData){
    return this.svgObj.add('image',{
      parent:this.getParent('chair'),
      attr:{
        width:svgData.width,
        height:svgData.height,
        x:svgData.x,
        y:svgData.y,
        'href':svgData.backImg,
      }
    },svgData);
  },
  targetActive:function(){
    this.targetEle.style.stroke = 'red';
  },
  setItemList:function(itemList){
      this.options.itemList = itemList;
      if(this.svg)this.setData();
  },
  removeList:function(list){
    list.forEach(function(a){
      a.parentElement && a.parentElement.removeChild(a);
    })
    list.splice(0);
  },
  removeItem:function(item){
    this.removeList(this.allItemData);
    this.removeList(this.headImgSvg);
    this.removeList(this.selectedPolygon);
  },
  getParent:function(category){
    return this[category + 'G'] || ({
      room:this.roomG,
      table:this.tableG,
      chair:this.chairG,
      userInfo:this.userInfoG,
    })[category] ;
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
