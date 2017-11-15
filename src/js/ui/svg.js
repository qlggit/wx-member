function mySvg(svg){
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
  var svgObj = this.svgObj = new mySvg(options.svg);
  this.roomG = svgObj.add('g',{});
  this.tableG = svgObj.add('g',{});
  this.chairG = svgObj.add('g',{});
  this.allSvgData = [];
  this.thisSvgData = '';
  this.svg = options.svg;
  var that = this;
  if(options.canvas){
    this.ctx = options.canvas.getContext('2d');
    this.imgData = options.imgData;
  }
  if(options.itemList){
    options.itemList.forEach(function(a){
      console.log(a);
      that[(
        {
          room:'addRoom',
          table:'addTable',
          chair:'addChair',
        }
        )[a.type]](a.svgData);
    });
  }
}
seatSvg.prototype = {
  addRoom:function(svgData){
    this.svgObj.add('rect',{
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
    console.log(svgData);
    console.log(this.getParent('table'));
    this.svgObj.add('rect',{
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
    this.svgObj.add('rect',{
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
  removeSvgData:function(){
    if(this.thisSvgData){
      var index = this.allSvgData.indexOf(this.thisSvgData);
      this.allSvgData.splice(index,1);
    }
    this.svg.removeChild(this.thisSvgData.svg);
    this.thisSvgData = null;
  },
  findSvgData:function(ele){
    var o;
    this.allSvgData.every(function(a){
      if(a.svg === ele){
        o = a;
        return false;
      }
      return true;
    });
    return o;
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
}
export default seatSvg;
