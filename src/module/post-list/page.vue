<style src="app/css/common.css"></style>
<style scoped>
    .page-content > .row {
      margin-left: 0px !important;
      margin-right: 0px !important;
      margin-top: 30px;
    }
</style>

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
    </div>
</template>

<script>
import header from '../../component/common/header.vue'
// import footer from '../../component/common/footer.vue'
import sidebar from '../../component/common/sidebar.vue'
import postList from '../../component/post/post-list.vue'

export default {
    data: function () {
        return {

        }
    },
    
    components: {
        "my-header": header,
        // "my-footer": footer,
        'sidebar': sidebar,
        'post-list': postList
    }
}
</script>
