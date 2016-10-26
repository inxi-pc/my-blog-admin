import Entry from 'app_lib/entry.js'
import categoryCreate from 'app_module/category/category-create.vue'

new Entry({
    el: "#app",

    components: {
        page: categoryCreate
    }
})