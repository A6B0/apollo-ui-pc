// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vecharts from 'v-charts'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import './theme/dist/iview.css'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(Vecharts)
Vue.use(VueAxios, axios)
//Vue.use(ElementUI)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
