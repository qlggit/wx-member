WY.toast = function(options){
  if(typeof options == 'string')options = {
    content:options
  };
  WY.trigger('toast' , options);
};
WY.loading = function(sts){
  WY.trigger('loading' , sts);
};
WY.share = function(){
  WY.trigger('share');
};
