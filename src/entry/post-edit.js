import Entry from 'app_lib/entry.js'
import postEdit from 'app_module/post/post-edit.vue'

new Entry({
    el: "#app",

    components: {
        page: postEdit
    }
})