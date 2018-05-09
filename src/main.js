import Vue from 'vue';
import App from './App';
import router from './router/router';
import store from './store';
import request from './assets/mUtils/request'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './limit'

Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false;
if (process.env.NODE_ENV === 'development') {
  //require('./mock/mock.js');
}
Vue.use(require('vue-wechat-title'));
Vue.prototype.request = request;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
