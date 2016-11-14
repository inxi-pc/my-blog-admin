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
    mergeParams() {
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

    getAuthorizedToken() {
        return sessionStorage.getItem("token");
    }

    produceAjaxObject(url, method, data, headers) {
        var ajax = {};
        var requiredHeaders = {
            Authorization: "bearer " + this.getAuthorizedToken()
        };

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
            ajax['headers'] = this.mergeParams(headers, requiredHeaders);
        } else {
            ajax['headers'] = requiredHeaders;
        }
       
        return ajax; 
    }
}