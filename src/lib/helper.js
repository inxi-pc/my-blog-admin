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

export { decodeQueryParams }