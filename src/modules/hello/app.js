import Vue from 'vue'
import router from './router'
import App from './app.vue'
import MVue from '@/lib/mvue.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new MVue({
  el: '#app',
  router,
  render: h => h(App)
})
