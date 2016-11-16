import JwtDecoder from "jwt-decode"

import config from "app_config/app.config.json"
import * as Helper from './helper.js'

export default class API {
    constructor() {
        this.apiGateway = config.apiGateway;
    }

    /**
     * Merge the params
     * 
     * @param Object or Array
     * @return Object
     */
    static mergeParams() {
        var params = {};
        for (var argsKey in arguments) {
            if (!Helper.isNullOrEmpty(arguments[argsKey])) {
                if (arguments instanceof Object) {
                    for (var argKey in arguments[argsKey]) {
                        params[argKey] = arguments[argsKey][argKey];
                    }
                } else {
                    params[argKey] = arguments[argsKey];
                }
            }
        }

        return params;
    }

    /**
     * 
     * Generate authorized ajax object for 3rd library, like datatables
     */
    static produceAuthorizedAjaxObject(url, method, data, headers, success, error) {
        var requiredHeaders = {
            Authorization: "bearer " + API.getAuthorizedToken()
        };
        var headers = this.mergeParams(requiredHeaders, headers);

        return API.produceAjaxObject(url, method, data, headers, success, error);
    }

    /**
     * 
     * Basic ajax generation method
     */
    static produceAjaxObject(url, method, data, headers, success, error) {
        var ajax = {};
        var Auth = require('app_api/auth.js');

        if (!Helper.isNullOrEmpty(url)) {
            ajax['url'] = url;
        } 
        if (!Helper.isNullOrEmpty(method)) {
            ajax['method'] = method;
        }
        if (!Helper.isNullOrEmpty(data)) {
            ajax['data'] = data;
        }
        if (!Helper.isNullOrEmpty(headers)) {
            ajax['headers'] = headers;
        } else {
            ajax['headers'] = requiredHeaders;
        }
        if (!Helper.isNullOrEmpty(success) && success instanceof Function) {
            ajax['success'] = success;
        } 
        if (!Helper.isNullOrEmpty(error) && error instanceof Function) {
            ajax['error'] = function (error, response) {
                Auth.unauthorizedHandler(response);
                error(response);
            };
        } else {
            ajax['error'] = function (response) {
                Auth.unauthorizedHandler(response);
            };
        }
       
        return ajax; 
    }
}