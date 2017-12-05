var demoImg = '/images/photo/demo.jpg';
WY.isDemoImg = function(url){
  return url === demoImg;
};
WY.getHeadImg = function(url){
  if(!url || demoImg === url)return demoImg;
  return global.WY.common.concatImgUrl(url);
};
