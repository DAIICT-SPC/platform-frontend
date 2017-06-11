import Vue from 'vue'
import 'bulma/css/bulma.css'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import Auth from './packages/auth/Auth'
import Toasted from 'vue-toasted';

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(Auth)
Vue.use(Toasted)


Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
