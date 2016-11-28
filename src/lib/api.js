import * as Helper from './helper.js'

export default class API {
    constructor() {
        this.apiGateway = Helper.getConfig('apiGateway');
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

    static unauthorizedHandle() {
        Helper.redirectToLoginPage();
    }

    static getPingInterval() {
        var interval = Helper.getConfig('pingInterval');

        return interval > 1000 ? interval : 30000;
    }

    /**
     * 
     * Basic ajax generation method
     */
    static produceAjaxObject(url, method, data, headers, success, error) {
        var ajax = {};

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
            ajax['error'] = error;
        } 
       
        return ajax; 
    }
}