import config from "app_config/app.config.json"

export default class API {
    
    constructor() {
        this.apiGateway = config.apiGateway;
    }
}