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
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false
        }
    }),
    new webpack.ProvidePlugin(config.provide)
];
plugins = plugins.concat(moduleConfig.extractPlugins);
module.exports = {
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