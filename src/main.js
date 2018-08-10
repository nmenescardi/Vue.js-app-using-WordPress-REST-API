import Vue from 'vue'
import App from './App'
import router from './router'

window.axios = require('axios')
Vue.config.productionTip = false

Vue.filter('readMore', function (text, length, suffix) {
  return text.substring(0, length) + suffix
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
