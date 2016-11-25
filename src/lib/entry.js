import Vue from 'vue'
import VueResource from 'vue-resource'
// import Vuex from 'vuex'

import * as Helper from './helper.js'
import Auth from 'app_api/auth.js'
// import vuexConfig from 'app_vuex/config.js'

Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
    request.credentials = true;

    next((response) => {
        if (response.status == 401) {
            Helper.Redirection.redirectToLoginPage();
        }
    });
})

// Vue.use(Vuex)

var helpers = {};
for (var i in Helper) {
    helpers[i] = Helper[i];
}
Vue.mixin({
    methods: helpers
})

export default Vue.extend({
    // store: new Vuex.Store(vuexConfig)
})
