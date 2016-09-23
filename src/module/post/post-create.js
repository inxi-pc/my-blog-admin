import Container from 'container'
import postCreate from './post-create.vue'

new Container({
    el: "#app",

    components: {
        page: postCreate
    }
})