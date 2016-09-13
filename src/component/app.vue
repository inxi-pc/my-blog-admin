<template>
    <div>
        <my-header></my-header>
        <div class="page-content">
            <div class="row">
                <div class="col-md-2">
                    <sidebar></sidebar>
                </div>
                <div class="col-md-10">
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

export default {
    replace: false,

    components: {
        "my-header": header,
        "my-footer": footer,
        'sidebar': sidebar
    }
}
</script>
