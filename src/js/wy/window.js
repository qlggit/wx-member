WY.toast = function(options){
  if(!options || typeof options !== 'object'){
    options = {
      content:options
    };
  }
  WY.trigger('toast' , options);
};
WY.loading = function(sts){
  WY.ready('loading' , sts);
};
WY.share = function(){
  WY.trigger('share');
};
WY.confirm = function(options){
  if(!options || typeof options !== 'object'){
    options = {
      content:options,
    };
  }
  if(options.showAble === undefined)options.showAble = 1;
  WY.trigger('confirm' , options);
};
