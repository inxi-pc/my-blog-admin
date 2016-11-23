import API from 'app_lib/api.js'
import Auth from 'app_api/auth.js'
import * as Helper from 'app_lib/helper.js'

class UserModel {
    constructor() {
        this.user_id = null;
        this.user_name = null;
        this.user_telephone = null;
        this.user_email = null;
        this.user_password = null;
        this.user_created_at = null;
        this.user_updated_at = null;
    }
}

export { UserModel };

export default class User extends API {
    constructor() {
       super();
       this.apiGateway += '/users/';
       this.listApiGateway = this.apiGateway + 'list';
    }
}