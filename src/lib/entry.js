import Vue from 'vue'
import VueResource from 'vue-resource'
// import Vuex from 'vuex'

import * as Helper from './helper.js'
// import vuexConfig from 'app_vuex/config.js'

Vue.use(VueResource)
// Vue.use(Vuex)
Vue.mixin({
    methods: {  
        decodeQueryParams: Helper.decodeQueryParams,
        isNullOrEmpty: Helper.isNullOrEmpty
    }
})

export default Vue.extend({
    // store: new Vuex.Store(vuexConfig)
})
