import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import app from './component/app.vue'
import postList from './component/post/post-list.vue'
import postEdit from './component/post/post-edit.vue'

import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"
import "app/css/styles.css"

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
    hashbang: false,
})

router.map({
    '/': {
        component: postList
    },

    '/posts': {
        component: postList
    },

    '/posts/create': {
        component: postEdit
    },

    '/posts/edit': {
        component: postEdit
    }
})

router.start(app, "#app")
