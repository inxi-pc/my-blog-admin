function decodeQueryParams() {
    var params = [], hash;
    var url = window.location.href;
    if (url.indexOf('?') != -1) {
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var k in hashes) {
            if (hashes[k].search("=") != -1) {
                hash = hashes[k].split('=');
                params[hash[0]] = hash[1];
            }
        }
    }
 
    return params;
}

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

function UnauthorizedCallback(response) {
    if (response.status == 401) {
        window.location.href='/dist/user-login.html';
    }
}

function refreshPage() {
    window.location.reload();
}

export { 
    decodeQueryParams, 
    isNullOrEmpty,
    UnauthorizedCallback 
}