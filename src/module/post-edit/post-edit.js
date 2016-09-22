import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import page from './page.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
// define global function
Vue.mixin({

})

var router = new VueRouter({
    hashbang: false,
})

router.start(page, "#app")
