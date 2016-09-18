<template>
    <div>
        <my-header></my-header>
        <div class="{{ appStyle['page-content'] }}">
            <div class="{{ appStyle['row'] }}">
                <div class="{{ bootstrapStyle['col-md-2'] }}">
                    <sidebar></sidebar>
                </div>
                <div class="{{ bootstrapStyle['col-md-10'] }}">
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
            appStyle: appStyle,
            bootstrapStyle: bootstrapStyle
        };
    },

    components: {
        "my-header": header,
        "my-footer": footer,
        'sidebar': sidebar
    }
}
</script>
