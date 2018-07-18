import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Util from './components/util.js'
import Cookie from './components/cookie'

var VueCookie = require('vue-cookie');
Vue.use(iView, VueCookie);

Vue.prototype.$http = Axios.create({
  baseURL: 'http://localhost:8080/'
  // baseURL: 'http://127.0.0.1:8080'
  // baseURL: 'http://cnshah0mrosql01:8080/SCM'
});
Vue.prototype.$util = Util;


router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  console.log(Cookie.get('user'));
  if (!Cookie.get('user') && to.name !== 'login') {
    next({name: 'login'});
  } else if (Cookie.get('user') && to.name === 'login') {
    next({name: 'index'});
  }
  else
    next();
});

router.afterEach((to) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
