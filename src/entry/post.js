import Vue from 'vue'
import VueRouter from 'vue-router'

import Entry from 'app_lib/entry.js'

import post from 'app_module/post/post.vue'

Vue.use(VueRouter)

var router = new VueRouter({
    hashbang: false
})

router.map({
    '/': {
        name: 'post-list',
        component: function (resolve) {
          require(['app_component/post/post-list.vue'], resolve)
        }
    },
    '/post-list': {
        name: 'post-list',
        component: function (resolve) {
          require(['app_component/post/post-list.vue'], resolve)
        }
    },
    '/post-create' : {
        name: 'post-create',
        component: function (resolve) {
          require(['app_component/post/post-create.vue'], resolve)
        }
    },
    '/post-edit/:postId': {
        name: 'post-edit',
        component: function (resolve) {
          require(['app_component/post/post-edit.vue'], resolve)
        }
    }
})

var root = Entry.extend({
    components: {
        page: post,
    }
})
router.start(root, '#app')
