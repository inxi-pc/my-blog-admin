import * as types from './mutation-type.js'

export default {
    [types.SET_ACTIVED] (state, tag) {
        state.actived = tag;
        Store.set('state', state);
    }
}