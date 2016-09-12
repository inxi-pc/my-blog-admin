<template>
    <div>
        <my-header></my-header>
        <div class="page-content">
            <div class="row">
                <div class="col-md-2">
                    <sidebar></sidebar>
                </div>
                <div class="col-md-10">
                    <post-list></post-list>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import header from './common/header.vue'
import footer from './common/footer.vue'
import sidebar from './common/sidebar.vue'

import postList from './post/post-list.vue'

export default {
    components: {
        "my-header": header,
        "my-footer": footer,
        'sidebar': sidebar,
        'post-list': postList
    }
}
</script>