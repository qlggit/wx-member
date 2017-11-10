import Vue from 'vue'
var demoImg = '/images/demo.png';
Vue.filter('imgUrlFilter', function (value) {
  if(!value || value === demoImg)return demoImg;
  if(/^\/\w/.test(value)){
      return WY.session.apiImgUrl + value;
  }
  return value;
});
