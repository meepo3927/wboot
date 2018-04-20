const Vue = require('vue');
const $ = require('jquery');
require('lib/jquery.slimscroll.min.js');

module.exports = {
    bind (el, binding, vnode) {
        let c = binding.value || {
            // width
            // height
            // color
        };
        Vue.nextTick(() => {
            $(el).slimScroll(c);
        });
    },
    update () {
    },
    unbind (el, binding) {
    }
};