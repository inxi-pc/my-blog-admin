import Store from 'store'

var state = Store.get('state');
if (!state) {
    state = {
        actived: 'dashboard'
    }
}

export default state
