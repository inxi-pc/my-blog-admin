import JwtDecoder from "jwt-decode"

import API from 'app_lib/api.js'
import * as Helper from 'app_lib/helper.js'

export default class Auth extends API {
    constructor() {
       super();
       this.apiGateway += '/users/';
    }

    /**
     * Store Authorization token
     */
    static persistAuthorizedToken(response) {
        sessionStorage.setItem('token', response.body.token);
    }

    /**
     * Destroy Authorization token
     */
    static destoryAuthorizedToken() {
        sessionStorage.removeItem('token');
    }

    /**
     * Get Authorization token
     */
    static getAuthorizedToken() {
        return sessionStorage.getItem("token");
    }

    /**
     * Get Authorization user
     */
    static getAuthorizedUser() {
        var token = Auth.getAuthorizedToken();
        var decodedToken = JwtDecoder(token);
        console.log(decodedToken);

        return decodedToken;
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

        return API.produceAjaxObject(url, method, data, headers, success, function (response) {
            if (response.status == 401) {
                Helper.redirectToLoginPage();
            }
        });
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

    /**
     * @return 
     */
    logout(vue) {
        Auth.destoryAuthorizedToken();
    }
}