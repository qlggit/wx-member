WY.toast = function(options){
  if(!options || typeof options !== 'object'){
    options = {
      content:options
    };
  }
  WY.trigger('toast' , options);
};
WY.loading = function(sts){
  WY.trigger('loading' , sts);
};
WY.share = function(){
  WY.trigger('share');
};
