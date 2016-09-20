<template>
    <div>
        <my-header></my-header>
        <div class="{{ getStyle('page-content') }}">
            <div class="{{ getStyle('row') }}">
                <div class="{{ getStyle('col-md-2') }}">
                    <sidebar></sidebar>
                </div>
                <div class="{{ getStyle('col-md-10') }}">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import header from './common/header.vue'
import footer from './common/footer.vue'
import sidebar from './common/sidebar.vue'

import "bootstrap/dist/js/bootstrap.js"
import bootstrapStyle from "bootstrap/dist/css/bootstrap.css"
import appStyle from "app/css/styles.css"

export default {
    replace: false,

    data: function () {
        return {
            style: this.setStyle(bootstrapStyle, appStyle)
        }
    },

    components: {
        "my-header": header,
        "my-footer": footer,
        'sidebar': sidebar
    }
}
</script>
