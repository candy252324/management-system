
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './permission'
import 'normalize.css'
import '@/styles/index.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import SvgIcon from '@/components/svgIcon'
Vue.component('svg-icon', SvgIcon)

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
