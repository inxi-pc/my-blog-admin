import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import app from './component/app.vue'
// import config from './config.js'

require("bootstrap/dist/js/bootstrap.js")
require("bootstrap/dist/css/bootstrap.css")
require("app/css/styles.css")

Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.use(config)

var router = new VueRouter({
    hashbang: false
})

router.map({

})

router.start(app, "#app")
