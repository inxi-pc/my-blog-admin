import Vue from 'vue'
import VueResource from 'vue-resource'
// import Vuex from 'vuex'

import * as Helper from './helper.js'
import Auth from 'app_api/auth.js'
// import vuexConfig from 'app_vuex/config.js'

// Vue.use(Vuex)

Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
    request.credentials = true;

    next((response) => {
       unauthorizedHandler(response);
    });
})

function unauthorizedHandler (response) {
    if (response.status == 401) {
        Helper.redirectToLoginPage();
    }
}

function decodeQueryParams() {
    var params = [], hash;
    var url = window.location.href;
    if (url.indexOf('?') != -1) {
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var k in hashes) {
            if (hashes[k].search("=") != -1) {
                hash = hashes[k].split('=');
                params[hash[0]] = hash[1];
            }
        }
    }
 
    return params;
}

function refreshPage() {
    window.location.reload();
}

var methods = {};
for (var i in Helper) {
    methods[i] = Helper[i];
}
methods['decodeQueryParams'] = decodeQueryParams;
methods['refreshPage'] = refreshPage;

Vue.mixin({
    methods: methods
})

export default Vue.extend({
    // store: new Vuex.Store(vuexConfig)
})
