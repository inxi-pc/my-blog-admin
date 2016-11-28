import Entry from 'app_lib/entry.js'
import userList from 'app_module/user/user-list.vue'

new Entry({
    el: "#app",

    components: {
        page: userList
    }
})



