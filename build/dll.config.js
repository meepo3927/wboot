var webpack = require('webpack');
var path = require('path');
var config = require('./config');
var util = require('./util.js');

const vendors = [
    'jquery',
    'vue',
    'polyfill',
    'global/dev'
];
const env = 'production';
var dist = config.DIST_PATH;
module.exports = {
    output: {
        path: dist,
        filename: '[name].js',
        library: '[name]'
    },
    entry: {
        dll: vendors
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dll-manifest.json'),
            name: '[name]',
            context: dist
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin(config.provide)
    ],
    module: {
        rules: util.getRules(env)
    },
    resolve: {
        alias: config.alias
    }
};