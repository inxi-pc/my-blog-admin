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
                        <sidebar actived="user"></sidebar>
                    </div>
                    <div class="col-md-10">
                        <user-list></user-list>
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
import userList from 'app_component/user/user-list.vue'

export default {
    data: function () {
        return {
           
        }
    },
    
    components: {
        "my-header": header,
        // "my-footer": Footer,
        'sidebar': sidebar,
        'user-list': userList
    }
}
</script>
