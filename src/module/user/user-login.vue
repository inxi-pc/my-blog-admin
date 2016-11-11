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
                    <user-login></user-login>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerVisitor from 'app_component/common/header-visitor.vue'
// import footer from 'app_component/common/footer.vue'
import userLogin from 'app_component/user/user-login.vue'

export default {
    data: function () {
        return {

        }
    },

    components: {
        "visitor-header": headerVisitor,
        // "my-footer": Footer,
        'user-login': userLogin
    }
}
</script>
