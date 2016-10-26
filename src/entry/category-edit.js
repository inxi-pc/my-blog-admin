import Entry from 'app_lib/entry.js'
import categoryEdit from 'app_module/category/category-edit.vue'

new Entry({
    el: "#app",

    components: {
        page: categoryEdit
    }
})