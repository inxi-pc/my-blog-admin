import config from "../../app.config.json"

export default class API {
    
    constructor() {
        this.api_gateway = config.api_gateway;
    }
}