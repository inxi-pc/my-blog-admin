import Vue from 'vue'
import VueResource from 'vue-resource'

import page from './page.vue'

Vue.use(VueResource)
// define global function
Vue.mixin({

})

new Vue({
    el: "#app",

    components: {
        page: page
    }
})
