import $ from "jquery";

function send(method, url, options) {
    options = options || {};

    var headers = options.headers || {},
        data = options.data || undefined;

    var promise = new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            headers: headers,
            data: JSON.stringify(data),
            success: function(res) {
                resolve(res);
            },
            error: function(err) {
                console.log(err);
                reject(err);
            }
        });
    });
    return promise;
}

function get(url, options) {
    return send('GET', url, options);
}

function post(url, options) {
    return send('POST', url, options);
}

function put(url, options) {
    return send('PUT', url, options);
}

export {
    send,
    get,
    post,
    put
};