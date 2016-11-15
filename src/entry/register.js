import Entry from 'app_lib/entry.js'
import register from 'app_module/auth/register.vue'

new Entry({
    el: "#app",

    components: {
        page: register
    }
})
