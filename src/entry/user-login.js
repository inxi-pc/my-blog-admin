import Entry from 'app_lib/entry.js'
import userLogin from 'app_module/user/user-login.vue'

new Entry({
    el: "#app",

    components: {
        page: userLogin
    }
})
