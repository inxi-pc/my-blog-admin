import Vue from 'vue'
import VueResource from 'vue-resource'
// import Vuex from 'vuex'

import * as Helper from './helper.js'
// import vuexConfig from 'app_vuex/config.js'

Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
    request.credentials = true;

    next((response) => {
        Helper.UnauthorizedCallback(response);
    });
})
// Vue.use(Vuex)
Vue.mixin({
    methods: {  
        decodeQueryParams: Helper.decodeQueryParams,
        isNullOrEmpty: Helper.isNullOrEmpty,
        UnauthorizedCallback: Helper.UnauthorizedCallback
    }
})

export default Vue.extend({
    // store: new Vuex.Store(vuexConfig)
})
