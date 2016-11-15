<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="app_asset/css/common.css"></style>
<style scoped>

</style>

<template>
    <div>
        <visitor-header></visitor-header>
        <div>
            <div class="container">
                <div class="row"> 
                    <login></login>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerVisitor from 'app_component/common/header-visitor.vue'
// import footer from 'app_component/common/footer.vue'
import login from 'app_component/auth/login.vue'

export default {
    data: function () {
        return {

        }
    },

    components: {
        "visitor-header": headerVisitor,
        // "my-footer": footer,
        'login': login
    }
}
</script>
