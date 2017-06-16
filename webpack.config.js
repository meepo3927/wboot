var path = require('path')
var webpack = require('webpack');
var util = require('./build/util');
var Webpack2Polyfill = require("webpack2-polyfill-plugin");

var JS_DIR = path.resolve(__dirname, 'js');

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
    mlayer$: 'lib/mlayer.js',
    autoComplete$: 'extend/jquery.autocomplete.js',
    echarts$: 'lib/echarts.min.js',
    // 通用
    polyfill$: JS_DIR + '/global/polyfill',
    config$: JS_DIR + '/global/config.js',
    root$: JS_DIR + '/root.js'
};

if (process.env.NODE_ENV === 'production') {
    var publicPath = './dist/';
} else {
    publicPath = '/dist/';
}


module.exports = {
    entry: util.getEntry(JS_DIR + '/entry/*.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: publicPath,
        filename: '[name].js'
    },
    module: {
        rules: util.getRules()
    },
    resolve: {
        alias
    },
    plugins: [
        new Webpack2Polyfill()
    ],
    devServer: {
        port: 8001,
        historyApiFallback: true,
        noInfo: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
