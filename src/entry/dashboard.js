import Entry from 'app_lib/entry.js'
import dashboard from 'app_module/dashboard/dashboard.vue'

new Entry({
    el: "#app",

    components: {
        page: dashboard
    }
})