import config from "app_config/app.config.json"

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
            if (arguments[argsKey] != null 
                || arguments[argsKey] != undefined) {
                for (var argKey in arguments[argsKey]) {
                    params[argKey] = arguments[argsKey][argKey];
                }
            }
        }

        return params;
    }
}