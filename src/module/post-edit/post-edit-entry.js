import Vue from 'vue'
import VueResource from 'vue-resource'

import { decodeQueryParams } from '../../helper.js'
import page from './page.vue'

Vue.use(VueResource)
Vue.mixin({
    methods: {
        decodeQueryParams
    }
})

new Vue({
    el: "#app",

    components: {
        page: page
    }
})