var config = require('config');
var request = require('util/request.js');

var Plugin = {};
Plugin.install = function (Vue, options) {
    let methods = {};
    methods.getPageUrl = function (path, param = '') {
        if (config.isProduction) {
            return config.basePath + path + '.jsp' + param;
        }
        return config.basePath + path + '.html' + param;
    };
    let computed = {};
    computed.vImgPath = function () {
        if (config.isProduction) {
            return config.basePath + '/images';
        }
        return '/images';
    };
    computed.vConfig = function () {
        return config;
    };
    computed.vRequest = function () {
        return request;
    };
    computed.vSpace = function () {
        return '　';
    };
    const mounted = function () {
    };
    Vue.mixin({
        mounted,
        methods,
        computed
    });
};

module.exports = Plugin;