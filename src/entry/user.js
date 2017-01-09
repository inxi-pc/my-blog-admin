import Vue from 'vue'
import VueRouter from 'vue-router'

import Entry from 'app_lib/entry.js'

import user from 'app_module/user/user.vue'

Vue.use(VueRouter)

var router = new VueRouter({
    hashbang: false
})

router.map({
    '/': {
        name: 'user-list',
        component: function (resolve) {
          require(['app_component/user/user-list.vue'], resolve)
        }
    },
    '/user-list': {
        name: 'user-list',
        component: function (resolve) {
          require(['app_component/user/user-list.vue'], resolve)
        }
    },
    '/user-create' : {
        name: 'user-create',
        component: function (resolve) {
          require(['app_component/user/user-create.vue'], resolve)
        }
    },
    '/user-edit/:userId': {
        name: 'user-edit',
        component: function (resolve) {
          require(['app_component/user/user-edit.vue'], resolve)
        }
    }
})

var root = Entry.extend({
    components: {
        page: user,
    }
})
router.start(root, '#app')
