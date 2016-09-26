import Entry from 'app_lib/entry.js'
import postCreate from 'app_module/post/post-create.vue'

new Entry({
    el: "#app",

    components: {
        page: postCreate
    }
})