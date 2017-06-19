var webpack = require('webpack');
var path = require('path');
var config = require('./config');

const vendors = [
    'jquery',
    'vue'
];
var dist = path.resolve(__dirname, '../dist');
var build = path.resolve(__dirname, '.');
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
            path: build + '/manifest.json',
            name: '[name]',
            context: dist
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    resolve: {
        alias: config.alias
    }
};