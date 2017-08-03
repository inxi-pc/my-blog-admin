import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './index/index'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
})
