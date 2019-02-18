require('polyfill');
// 基础库
window.LOG = function () {
    if (window.console && window.console.log) {
        var len = arguments.length;
        for (var i = 0; i < len; i++) {
            window.console.log(arguments[i]);
        }
    }
};
// 扩展库
const MUIMsg = require('extend/vue.mui-msg.js');
const MUIMsgBox = require('extend/vue.mui-msgbox.js');
const MUIloading = require('extend/vue.mui-loading.js');
const MUITooltip = require('extend/vue.mui-tooltip.js');
const vueCommon = require('extend/vue.common.js');
require('../less/entry.less');
Vue.prototype.$msg = MUIMsg;
Vue.prototype.$alert = MUIMsgBox.alert;
Vue.prototype.$confirm = MUIMsgBox.confirm;
Vue.prototype.$prompt = MUIMsgBox.prompt;
Vue.prototype.$loading = MUIloading;
Vue.directive('tooltip', MUITooltip);
Vue.use(vueCommon);
// Vue.component('v-date', require(comp/common/date.vue));
// Vue.component('center-layer', require('comp/common/center-layer.vue'))
