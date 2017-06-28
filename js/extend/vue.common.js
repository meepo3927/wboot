var Plugin = {};
Plugin.install = function (Vue, options) {
    let methods = {};
    let computed = {};
    computed.vImgPath = function () {
    };
    const mounted = function () {
    };
    Vue.mixin({
        mounted,
        methods,
        computed
    });
};

module.exports = Plugin;