import 'polyfill';
// 基础库
import Vue from 'vue';
import config from 'config';
import dev from 'global/dev';
import request from 'util/request';
dev.processEnv();
// 扩展库
import Msg from 'extend/vue.mui-msg.js';
import MsgBox from 'extend/vue.mui-msgbox.js';
import loading from 'extend/vue.mui-loading.js';
import tooltip from 'extend/vue.mui-tooltip.js';
import vueCommon from 'extend/vue.common.js';
import vFileUpload from 'comp/common/file-upload.vue';
//import vDate from 'comp/common/date.vue';
//import vChosen from 'comp/common/v-chosen.vue';
require('../less/entry.less');
Vue.prototype.$msg = Msg;
Vue.prototype.$alert = MsgBox.alert;
Vue.prototype.$confirm = MsgBox.confirm;
Vue.prototype.$prompt = MsgBox.prompt;
Vue.prototype.$loading = loading;
Vue.directive('tooltip', tooltip);
Vue.use(vueCommon);
Vue.component('file-upload', vFileUpload);
// Vue.component('v-date', vDate);
// Vue.component('v-chosen', vChosen);
export {
    Vue,
    request
};