
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'
import './permission'
import '@/mock'


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
