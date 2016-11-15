<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="app_asset/css/common.css"></style>
<style scoped>

</style>

<template>
    <div>
        <visitor-header></visitor-header>
        <div class="container">
            <div class="row"> 
                <register></register>
            </div>
        </div>
    </div>
</template>

<script>
import headerVisitor from 'app_component/common/header-visitor.vue'
// import footer from 'app_component/common/footer.vue'
import register from 'app_component/auth/register.vue'

export default {
    data: function () {
        return {

        }
    },

    components: {
        'visitor-header': headerVisitor,
        // "my-footer": footer,
        'register': register
    }
}
</script>
