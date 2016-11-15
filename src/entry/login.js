import Entry from 'app_lib/entry.js'
import login from 'app_module/auth/login.vue'

new Entry({
    el: "#app",

    components: {
        page: login
    }
})
