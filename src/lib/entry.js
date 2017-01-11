import Vue from 'vue'
import VueResource from 'vue-resource'

import * as Helper from './helper.js'
import API from './api.js'

Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
    request.credentials = true;

    next((response) => {
       API.responseHandler(response);
    });
})

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

var methods = {};
for (var i in Helper) {
    methods[i] = Helper[i];
}
methods['decodeQueryParams'] = decodeQueryParams;
Vue.mixin({
    methods: methods
})

export default Vue.extend({})
