/**
 * 请求数据
 */

let Promise = require('promise');
let config = require('config');
let URL = require('util/url');
let Fetch = require('util/fetch');
let mock = !config.isProduction;
let ajaxUrlBase = config.ajaxUrlBase;

const parseNum = (str) => {
    let r = str.match(/\d+/g);
    if (!r) {
        return 0;
    }
    return parseInt(r[0], 10);
};
const parseNumArray = (str) => {
    let r = str.match(/\d+/g);
    if (!r) {
        return 0;
    }
    return r.map((v) => {
        return parseInt(v, 10);
    });
};

const handleResult = (r) => {
    if (!r || r.success === false) {
        return Promise.reject(r);
    }
    return r;
};
const fetch1 = (url, data) => {
    return Fetch.getJSON(url, data).then((result) => {
        return handleResult(result);
    });
};
const fetch2 = (path, param) => {
    if (mock) {
        return fetch1(ajaxUrlBase + `${path}.json`, param);
    }
    return fetch1(ajaxUrlBase + `${path}.do`, param);
};
const post = (path, param) => {
    let url = ajaxUrlBase + path + '.do';
    return Fetch.post(url, param).then((r) => {
        return handleResult(r);
    }).catch(() => {
        LOG(`post ${path} error`);
    });
};

const debounceRequest = (func) => {
    func._debounceRequestId = 0;
    return function () {
        func._debounceRequestId++;
        var args = Array.prototype.slice.call(arguments);
        var p = func.apply(this, args);
        var myId = func._debounceRequestId;
        return p.then((r) => {
            // 对比id
            if (myId === func._debounceRequestId) {
                return r;
            }
            // Will Never Excute
            return new Promise(() => {});
        });
    };
};

let exports = {};
exports.menu = function () {
    return fetch1(ajaxUrlBase + '/data_json/left_menu.json');
};

module.exports = exports;