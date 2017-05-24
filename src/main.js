import Vue from 'vue'
import App from './App'
import router from './router'
import 'bulma/css/bulma.css'
import VeeValidate from 'vee-validate'
import Auth from './packages/auth/Auth.js'

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(Auth)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
