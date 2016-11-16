import API from 'app_lib/api.js'

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
        if (Helper.isNullOrEmpty(token)) {
            Helper.redirectToLoginPage();
        } else {
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
        }
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