var divDemo = document.createElement('div');
WY.$ = function(selector , parent){
  return new $.init(selector,parent);
};
window.$ = window.$ || WY.$;
$.init = function(selector , parent){
  var rows = [];
  if(typeof selector === 'string' && selector.indexOf('<') === 0){
    divDemo.innerHTML = selector;
    rows = divDemo.children || divDemo.childNodes;
  }else{
    if(typeof selector === 'object'){
      rows.push(selector);
    }
    else [].slice.call($(parent || document)).forEach(function(a){
      $.each(a.querySelectorAll(selector) , function(i , o){
        rows.push(o);
      })
    });
  }
  this.length = rows.length;
  var that = this;
  $.each(rows , function(i , o){
    that[i] = o;
  });
};
$.init.prototype = {
  constructor:$,
  splice:[].splice
};
$.constructor = $.init.constructor;
$.fn = $.init.prototype;
Object.assign($.fn,{
  attr:function(attr,val){
    if(arguments.length === 1){
      return this[0].getAttribute(attr);
    }
    else{
      return this.each(function(i , o){
        o.setAttribute(attr,val);
      });
    }
  },
  each:function(func){
    for(var i = 0;i<this.length;i++){
      if(func(i , this[i])===false)return this;
    }
    return this;
  },
  bind:function(type,func){
    return this.each(function(i , a){
      type.split(' ').forEach(function(b){
        a.addEventListener(b , function(e){
          func.call(a , e);
        } , false);
      });
    })
  }
});
$.each = function(data , func){
  if(data){
    if(data.length && !isNaN(data.length)){
      for(var i=0;i<data.length;i++){
        if(func(i , data[i])===false)return;
      }
      return;
    }
    if(typeof data === 'object'){
      for(var key in data){
        if(func(key , data[key])===false)return;
      }
    }
  }
};
