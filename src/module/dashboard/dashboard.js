import Container from 'container'
import dashboard from './dashboard.vue'

new Container({
    el: "#app",

    components: {
        page: dashboard
    }
})