import Container from 'container'
import postList from './post-list.vue'

new Container({
    el: "#app",

    components: {
        page: postList
    }
})



