<style>
    body {
      font-family: 'Open Sans', sans-serif!important;
      background-color: #f7f7f7;
      position: relative;
      margin: 0px;
      font-size: 12px;
      padding: 0px;
    }

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
                    <post-edit></post-edit>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import header from '../../component/common/header.vue'
// import footer from '../../component/common/footer.vue'
import sidebar from '../../component/common/sidebar.vue'
import postEdit from '../../component/post/post-edit.vue'

export default {
    replace: false,

    data: function () {
        return {

        }
    },

    components: {
        "my-header": header,
        // "my-footer": footer,
        'sidebar': sidebar,
        'post-edit': postEdit
    }
}
</script>
