import 'polyfill';
// 基础库
import Vue from 'vue';
import config from 'config';
import dev from 'global/dev';
import request from 'util/request';
// 扩展库
import Msg from 'extend/vue.mui-msg.js';
import MsgBox from 'extend/vue.mui-msgbox.js';
import loading from 'extend/vue.mui-loading.js';
Vue.prototype.$msg = Msg;
Vue.prototype.$alert = MsgBox.alert;
Vue.prototype.$confirm = MsgBox.confirm;
Vue.prototype.$prompt = MsgBox.prompt;
Vue.prototype.$loading = loading;

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
    request
};