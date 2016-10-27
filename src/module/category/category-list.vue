<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="app_asset/css/common.css"></style>
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
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-md-2">
                        <sidebar actived="category"></sidebar>
                    </div>
                    <div class="col-md-10">
                        <category-list></category-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import header from 'app_component/common/header.vue'
// import footer from 'app_component/common/footer.vue'
import sidebar from 'app_component/common/sidebar.vue'
import categoryList from 'app_component/category/category-list.vue'

export default {
    data: function () {
        return {
           
        }
    },
    
    components: {
        "my-header": header,
        // "my-footer": Footer,
        'sidebar': sidebar,
        'category-list': categoryList
    }
}
</script>
