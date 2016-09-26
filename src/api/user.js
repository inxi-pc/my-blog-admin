import API from 'app_lib/api.js'

class UserModel {
    constructor() {
        this.user_id = 0;
        this.user_name = "";
        this.telephone = "";
        this.email = "";
        this.user_password = "";
        this.user_created_at = "";
        this.user_updated_at = "";
    }
}

export default class User extends API {
    constructor() {
       super();
       this.apiGateway += '/users/';
    }

    getAuthorizedUser() {
        var user = new UserModel();
        user.user_id = 1;
        user.user_name = "xiongbingchao";
        user.telephone = "123123123";
        user.email = "test@xiong.com";
        user.user_password = "123123";
        user.user_created_at = "2010-03-04 12:00:00";
        user.user_updated_at = "2010-03-14 22:00:00";
    }
}