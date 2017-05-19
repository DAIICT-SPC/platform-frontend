import Vue from 'vue'
import App from './App'
import router from './router'
import 'bulma/css/bulma.css'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false
Vue.use(VeeValidate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
