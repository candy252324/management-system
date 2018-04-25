import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUi from 'element-ui'
import VueI18n from 'vue-i18n'
import lang from '@/lang'
import 'reset.css'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'
import '@/mock'
import './permission'
import '@/directive'
import SvgIcon from '@/components/SvgIcon'
Vue.component('svg-icon', SvgIcon)

Vue.use(VueI18n)
Vue.use(ElementUi, {
  // size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

Vue.prototype.formatClientData = function (key,id){
  var clientData=this.$store.getters.clientData;
  var name="";
  if(id){
    if(clientData[key] && clientData[key][id]){
      name=clientData[key][id].name;
    }else{
      name="";
    }
  }
  return name;
}

const i18n = new VueI18n({
  locale: store.getters.language,
  messages:lang,
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
