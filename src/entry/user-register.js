import Entry from 'app_lib/entry.js'
import userRegister from 'app_module/user/user-register.vue'

new Entry({
    el: "#app",

    components: {
        page: userRegister
    }
})
