import Entry from 'app_lib/entry.js'
import categoryList from 'app_module/category/category-list.vue'

new Entry({
    el: "#app",

    components: {
        page: categoryList
    }
})