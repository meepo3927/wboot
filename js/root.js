import 'polyfill';
// 基础库
import Vue from 'vue';
import mlayer from 'mlayer';
import config from 'config';

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
var processEnv = function () {
    try {
        let env = process.env || {};
        let o = env.RUN_ENV;
        // LOG(o);
        if (o !== 'production') {
            let list = document.querySelectorAll('[only-prod]');
            for (let i = 0; i < list.length; i++) {
                let node = list[i];
                (node.parentNode || node.parentElement).removeChild(node);
            }
        }
    } catch(e) {
        LOG('process env error.', e);
    }
};

processEnv();
window.LOG = LOG;

export {
    Vue,
    mlayer,
    LOG
};