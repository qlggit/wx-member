import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
var routes = [];
require('./login').default(routes);
require('./home').default(routes);
require('./merchant').default(routes);
require('./my').default(routes);
export default new Router({
  mode: 'history',
  routes: routes
})
