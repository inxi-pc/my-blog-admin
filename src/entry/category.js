import Vue from 'vue'
import VueRouter from 'vue-router'

import Entry from 'app_lib/entry.js'

import category from 'app_module/category/category.vue'

Vue.use(VueRouter)

var router = new VueRouter({
    hashbang: false
})

router.map({
    '/': {
        name: 'category-list',
        component: function (resolve) {
            require(['app_component/category/category-list.vue'], resolve)
        }
    },
    '/category-list': {
        name: 'category-list',
        component: function (resolve) {
            require(['app_component/category/category-list.vue'], resolve)
        }
    },
    '/category-create' : {
        name: 'category-create',
        component: function (resolve) {
            require(['app_component/category/category-create.vue'], resolve)
        }
    },
    '/category-edit/:categoryId': {
        name: 'category-edit',
        component: function (resolve) {
            require(['app_component/category/category-edit.vue'], resolve)
        }
    }
})

var root = Entry.extend({
    components: {
        page: category,
    }
})
router.start(root, '#app')
