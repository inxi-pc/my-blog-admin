import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import app from './component/app.vue'
import postList from './component/post/post-list.vue'
import postEdit from './component/post/post-edit.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.mixin({
    methods: {
        getStyle: function () {
            var style = '';
            for (var key in arguments) {
                var classes = this.style[arguments[key]];
                for (var classKey in classes) {
                    style = style + ' ' + classes[classKey];
                }
            }

            return style;
        },

        setStyle: function () {
            var styles = [];
            for (var key in arguments) {
                var styleLib = arguments[key];
                for (var styleKey in styleLib) {
                    if (styleLib.hasOwnProperty(styleKey)) {
                        if (styles[styleKey] != undefined) {
                            styles[styleKey].push(styleLib[styleKey]);
                        } else {
                            styles[styleKey] = [];
                            styles[styleKey].push(styleLib[styleKey]);
                        }
                    }
                }
            }

            console.log(arguments);
            return styles;
        }
    }
})

var router = new VueRouter({
    hashbang: false,
})

router.map({
    '/': {
        component: postList
    },

    '/posts': {
        component: postList
    },

    '/posts/create': {
        component: postEdit
    },

    '/posts/edit': {
        component: postEdit
    }
})

router.start(app, "#app")
