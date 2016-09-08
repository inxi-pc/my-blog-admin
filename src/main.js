import Vue from 'vue'
import VueRouter from 'vue-router'

import app from './components/app.vue'


require("bootstrap/dist/js/bootstrap.js")
require("bootstrap/dist/css/bootstrap.css")
require("app_lib/css/styles.css")


Vue.use(VueRouter)

var router = new VueRouter({
    hashbang: false
})  

router.map({
    
})

router.start(app, "#app")
