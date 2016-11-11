import API from 'app_lib/api.js'

class UserModel {
    constructor() {
        this.user_id = null;
        this.user_name = null;
        this.telephone = null;
        this.email = null;
        this.user_password = null;
        this.user_created_at = null;
        this.user_updated_at = null;
    }
}

export default class User extends API {
    constructor() {
       super();
       this.apiGateway += '/users/';
    }

    /**
     * 
     * @return Promise
     */
    registerUser(vue, user) {
        var url = this.apiGateway + '/register';

        return vue.$http.post(url, user);
    }

    /**
     * 
     * @return Promise
     */
    loginUser(vue, user) {
        var url = this.apiGateway + '/login';

        return vue.$http.post(url, user);
    }
}