import Vue from 'vue'
var demoImg = '/images/demo.png';
Vue.filter('imgUrlFilter', function (value) {
  if(!value || value === demoImg)return demoImg;
  if(/^\/\w/.test(value)){
      return WY.session.apiImgUrl + value;
  }
  return value;
});
Vue.filter('sexUrlFilter', function (value) {
  return value === "1"?'/images/my/man.png':'/images/my/woman.png';
});
Vue.filter('lvlUrlFilter', function (value) {
  return value === "1"?'/images/my/lvl.png':'/images/my/lvl.png';
});
Vue.filter('moneyFilter', function (value) {
  if(isNaN(value))return 0;
  return (value / 100).toFixed(2);
});
