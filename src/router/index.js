import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
var routes = [];
var login = require('./login').default(routes);
var home = require('./home').default(routes);
var merchant = require('./merchant').default(routes);
export default new Router({
  mode: 'history',
  routes: routes
})
