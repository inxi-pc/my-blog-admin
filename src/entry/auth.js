import Vue from 'vue'
import VueRouter from 'vue-router'

import Entry from 'app_lib/entry.js'

import auth from 'app_module/auth/auth.vue'

Vue.use(VueRouter)

var router = new VueRouter({
    hashbang: false
})

router.map({
    '/': {
        name: 'login',
        component: function (resolve) {
            require(['app_component/auth/login.vue'], resolve)
        }
    },
    '/login': {
        name: 'login',
        component: function (resolve) {
            require(['app_component/auth/login.vue'], resolve)
        }
    },
    '/register' : {
        name: 'register',
        component: function (resolve) {
            require(['app_component/auth/register.vue'], resolve)
        }
    }
})

var root = Entry.extend({
    components: {
        page: auth,
    }
})
router.start(root, '#app')
