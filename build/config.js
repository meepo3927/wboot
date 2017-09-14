var path = require('path');

var JS_DIR = path.resolve(__dirname, '../js');
var DIST_PATH = path.resolve(__dirname, '../dist');

var alias = {
    // 目录
    lib: JS_DIR + '/lib',
    util: JS_DIR + '/util',
    comp: JS_DIR + '/comp',
    extend: JS_DIR + '/extend',
    global: JS_DIR + '/global',
    pages: JS_DIR + '/pages',
    mixins: JS_DIR + '/mixins',

    // 基础库
    jquery$: 'lib/jquery-2.1.1.min.js',
    vue$: 'lib/vue.min.js',
    velocity$: 'lib/velocity.min.js',

    // 工具,插件
    Promise$: 'lib/promise.js',
    promise$: 'lib/promise.js',
    mlayer$: 'lib/mlayer.js',
    autoComplete$: 'extend/jquery.autocomplete.js',
    echarts$: 'lib/echarts.min.js',
    // 通用
    polyfill$: JS_DIR + '/global/polyfill',
    config$: JS_DIR + '/global/config.js',
    root$: JS_DIR + '/root.js'
};

module.exports = {
    alias,
    provide: {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    },
    productionPublicPath: '/wboo/dist/',
    developmentPublicPath: '/dist/',
    JS_DIR,
    DIST_PATH,
    SERVER_PORT: 8003,
    SERVER_DIR: path.resolve(__dirname, '..')
};