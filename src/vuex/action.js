import * as types from './mutation-type.js'

export function activeMenu({ dispatch }, tag) {
    dispatch(types.SET_ACTIVED, tag);
}