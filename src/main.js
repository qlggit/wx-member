// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import WY from './js/wy/index.js'
import router from './router/index.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
window.vueRouter = router;
router.beforeEach(function(to , from , next){
  WY.hrefData = WY.common.getHrefData(to.fullPath);
  WY.hrefData.supplierId = WY.hrefData.merchantId = WY.hrefData.supplierId || WY.hrefData.merchantId;
  WY.trigger('router-change',{
    to:to,
    from:from
  });
  if(WY.routerChange && WY.routerChange(to , from) === false){
    return false;
  }
  var beforeHref = location.href;
  doNext();
  function doNext(){
    next();
    WY.trigger('router-change-after',{
      beforeHref:beforeHref,
      afterHref:location.href
    });
  }

});
router.afterEach(function(to , from ){
  WY.trigger('router-after');
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
