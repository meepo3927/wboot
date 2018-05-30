/**
 * 请求数据
 */

let Promise = require('promise');
let config = require('config');
let URL = require('util/url');
let Fetch = require('util/fetch');
let mock = !config.isProduction;
let ajaxUrlBase = config.ajaxUrlBase;

const handleResult = (result) => {
    if (!result || result.success === false) {
        return Promise.reject(result);
    }
    return result;
};
const handleResult2 = (result) => {
    if (!result) {
        return Promise.reject(result);
    }
    if (result.success === true) {
        return result.data;
    }
    if (result.success === undefined && result.data !== undefined) {
        return result.data;
    }
    return Promise.reject(result);
};
const baseFetch = (url, data) => {
    return Fetch.getJSON(url, data).then((result) => {
        return handleResult(result);
    });
};
const fetch1 = (path, param) => {
    if (mock) {
        return baseFetch(ajaxUrlBase + `${path}.json`, param);
    }
    return baseFetch(ajaxUrlBase + `${path}.do`, param);
};
const fetch2 = (path, param) => {
    return fetch1(path, param).then((result) => {
        return handleResult2(result);
    });
};
const post = (path, param) => {
    let url = ajaxUrlBase + path + '.do';
    return Fetch.post(url, param).then((r) => {
        return handleResult(r);
    });
};


const exports = {
    fetch1,
    fetch2,
    post
};

module.exports = exports;