import Vue from 'vue'
import VueResource from 'vue-resource'
import * as Util from './util.js'

Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
  request.credentials = true

  next((response) => {
    //  todo
  })
})

Vue.mixin({
  methods: Util
})

export default Vue.extend({})
