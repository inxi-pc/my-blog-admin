import config from "app_config/app.config.json"

function isNullOrEmpty(value) {
    // null or undefined
    if (value == undefined || value == null) {
        return true;
    }
    
    // empty
    if (Object.prototype.toString.call(value) == '[object String]') {
        if (value.length <= 0) {
            return true;
        }
    }

    return false;
}

function redirectToLoginPage() {
    var href = '/dist/login.html';
    redirect(href);
}

function redirect(url) {
    window.location.href = url;
}

function getConfig(name) {
    return config[name];
}

export { 
    isNullOrEmpty,
    redirect,
    redirectToLoginPage,
    getConfig
}