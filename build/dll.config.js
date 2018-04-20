var webpack = require('webpack');
var path = require('path');
var config = require('./config');
var util = require('./util.js');

const vendors = [
    'jquery',
    'vue',
    'polyfill',
    'dll_less'
];
const env = 'production';
var moduleConfig = util.getModuleConfig(env, 'dll');
var plugins = [
    new webpack.DllPlugin({
        path: path.join(__dirname, 'dll-manifest.json'),
        name: '[name]',
        context: config.DIST_PATH
    }),
    new webpack.ProvidePlugin(config.provide)
];
if (config.VERSION === 2) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false
        }
    }));
}
plugins = plugins.concat(moduleConfig.extractPlugins);
let dllConfig = {
    output: {
        path: config.DIST_PATH,
        filename: '[name].js',
        library: '[name]'
    },
    entry: {
        dll: vendors
    },
    plugins: plugins,
    module: {
        rules: moduleConfig.rules
    },
    resolve: {
        alias: config.alias
    }
};
if (config.VERSION === 4) {
    dllConfig.mode = 'production';
}
module.exports = dllConfig;