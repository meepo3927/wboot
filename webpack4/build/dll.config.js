var webpack = require('webpack');
var path = require('path');
var config = require('./config');

const vendors = [
    'jquery',
    'vue'
];
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
        new webpack.ProvidePlugin(config.provide)
    ],
    resolve: {
        alias: config.alias
    }
};