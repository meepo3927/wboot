import Vue from 'vue';
import 'lib/jquery.slimscroll.min.js';

export default {
    // Vue.directive('slimscroll', vueSlimScroll);
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