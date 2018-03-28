import 'polyfill';
// 基础库
import Vue from 'vue';
import mlayer from 'mlayer';
import config from 'config';
import dev from 'global/dev';
import request from 'util/request';

import Msg from 'extend/vue.mui-msg.js';
Vue.prototype.$msg = Msg;

window.LOG = dev.LOG;

Vue.use(require('extend/vue.common.js'));
Vue.component('file-upload', require('comp/common/file-upload.vue'));
// Vue.component('v-date', require('comp/common/date.vue'));
// Vue.component('v-chosen', require('comp/common/v-chosen.vue'));
require('../less/vendor.less');
require('../less/entry.less');

dev.processEnv();

export {
    Vue,
    mlayer,
    request
};