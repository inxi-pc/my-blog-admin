import Entry from 'app_lib/entry.js'
import postList from 'app_module/post/post-list.vue'

new Entry({
    el: "#app",

    components: {
        page: postList
    }
})



