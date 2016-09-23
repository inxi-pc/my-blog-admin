import Vuex from 'vuex'
import Store from 'store'

import * as types from './mutation-type.js'

var state = Store.get('state');
if (!state) {
    state = {
        actived: 'dashboard'
    }
}

export default { 
    state: state,

    mutations: {
        [types.SET_ACTIVED] (state, tag) {
            state.actived = tag;
            Store.set('state', state);
        }
    }
}