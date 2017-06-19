var path = require('path');
var webpack = require('webpack');
var util = require('./build/util');
var config = require('./build/config');
var Webpack2Polyfill = require("webpack2-polyfill-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var JS_DIR = path.resolve(__dirname, 'js');

// var nodeEnv = process.env.NODE_ENV;
var env = process.env.RUN_ENV || 'development';

if (env === 'production') {
    var publicPath = '/wboo/dist/';
} else {
    publicPath = '/dist/';
}
var distPath = path.resolve(__dirname, './dist');

module.exports = {
    entry: util.getEntry(JS_DIR + '/entry/*.js'),
    output: {
        path: distPath,
        publicPath: publicPath,
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    module: {
        rules: util.getRules(env)
    },
    resolve: {
        alias: config.alias
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            minChunks: 2
        }),
        new webpack.ProvidePlugin(config.provide),
        new Webpack2Polyfill(),
        new webpack.DefinePlugin({
            'process.env': {
                RUN_ENV: `"${env}"`
            }
        }),
        new webpack.DllReferencePlugin({
            context: distPath,
            manifest: require('./build/dll-manifest.json'),
            name: 'dll'
        })
    ],
    devServer: {
        port: 8001,
        historyApiFallback: true,
        noInfo: false
    },
    devtool: '#cheap-module-source-map'
}

if (env === 'production') {
    module.exports.devtool = '#source-map';

    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            // minimize: true
        }),
        new CleanWebpackPlugin(['dist'], {
            exclude: [
                'dll.js'
            ]
        })
    ]);
    if (config.cssExtract) {
        module.exports.plugins.push(new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }));
    }
}
