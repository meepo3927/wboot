import 'polyfill';
// 基础库
import Vue from 'vue';
import mlayer from 'mlayer';
import config from 'config';
import dev from 'global/dev';

window.LOG = dev.LOG;

Vue.use(require('extend/vue.common.js'));

require('../less/vendor.less');
require('../less/entry.less');

dev.processEnv();

export {
    Vue,
    mlayer
};