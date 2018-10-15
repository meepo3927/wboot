const config = require('global/config.js');
const wParam = [
    'toolbar=no',
    'menubar=no',
    'status=no',
    'location=yes',
    'scrollbars=yes',
    'resizable=yes',
    'width=1024px',
    'height=768px'
].join(',');
module.exports = {
    // Vue.directive('clickoutside', vueClickOutSide);
    bind (el, binding, vnode) {
        if (binding.value) {
            el.__VueOpenUrl = binding.value;
        }
        el.__VueOpenClickFunc = () => {
            if (el.__VueOpenUrl) {
                let date = new Date();
                let url = el.__VueOpenUrl;
                if (~url.indexOf('?')) {
                    url += '&var=' + date.getTime();
                } else {
                    url += '?var=' + date.getTime();
                }
                window.open(url, '', wParam);
            }
        };
        el.addEventListener('click', el.__VueOpenClickFunc);
    },
    update (el, binding) {
        el.__VueOpenUrl = binding.value;
    },
    unbind (el, binding) {
        el.removeEventListener('click', el.__VueOpenClickFunc);
        delete el.__VueOpenClickFunc;
        delete el.__VueOpenUrl;
    }
};