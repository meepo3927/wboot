import 'polyfill';
// 基础库
import Vue from 'vue';
import mlayer from 'mlayer';

require('../less/vendor.less');
require('../less/entry.less');

var LOG = function () {
    if (window.console && window.console.log) {
        var len = arguments.length;
        for (var i = 0; i < len; i++) {
            window.console.log(arguments[i]);
        }
    }
};
window.LOG = LOG;

export {
    Vue,
    mlayer,
    LOG
};