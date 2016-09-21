<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="app/css/responsive.css"></style>
<style>
    body {
      font-family: 'Open Sans', sans-serif!important;
      background-color: #f7f7f7;
      position: relative;
      margin: 0px;
      font-size: 12px;
      padding: 0px;
    }

    body {
      background-color: #eff0f3;
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
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import header from './common/header.vue'
// import footer from './common/footer.vue'
import sidebar from './common/sidebar.vue'

export default {
    replace: false,

    data: function () {
        return {

        }
    },

    components: {
        "my-header": header,
        // "my-footer": footer,
        'sidebar': sidebar
    }
}
</script>
