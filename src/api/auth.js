import JwtDecoder from "jwt-decode"

import API from 'app_lib/api.js'
import * as Helper from 'app_lib/helper.js'

export default class Auth extends API {
    constructor() {
       super();
    }
    
    /**
     * UnauthorizedHandler
     */
    static unauthorizedHandler(response) {
        if (response.status == 401) {
            Helper.redirectToLoginPage();
        }
    }

    /**
     * Store Authorization token
     */
    static persistAuthorizedToken(response) {
        console.log(response);
        sessionStorage.setItem('token', response.body.token);
    }

    /**
     * Get Authorization token
     */
    static getAuthorizedToken() {
        var token = sessionStorage.getItem("token");
        if (!Helper.isNullOrEmpty(token)) {
            var decodedToken = JwtDecoder(token);
            var expired = decodedToken.exp;
            var expiredDate = new Date(expired * 1000);
            var now = new Date();
            console.log(expiredDate);
            console.log(now);
            if (now > expired) {
                Helper.redirectToLoginPage();
            } else {
                return token;
            }
        } else {
            Helper.redirectToLoginPage();
        }
    }

    /**
     * 
     * Generate authorized ajax object for 3rd library, like datatables
     */
    static produceAuthorizedAjaxObject(url, method, data, headers, success, error) {
        var requiredHeaders = {
            Authorization: "bearer " + Auth.getAuthorizedToken()
        };
        var headers = this.mergeParams(requiredHeaders, headers);

        return API.produceAjaxObject(url, method, data, headers, success, Auth.unauthorizedHandler);
    }

    /**
     * 
     * @return Promise
     */
    register(vue, user) {
        var url = this.apiGateway + 'register';

        return vue.$http.post(url, user);
    }

    /**
     * 
     * @return Promise
     */
    login(vue, user) {
        var url = this.apiGateway + 'login';

        return vue.$http.post(url, user);
    }
}