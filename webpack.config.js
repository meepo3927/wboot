var webpack = require('webpack');
var util = require('./build/util');
var config = require('./build/config');
var Webpack2Polyfill = require("webpack2-polyfill-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const SERVER_PORT = config.SERVER_PORT;
const JS_DIR = config.JS_DIR;
const DIST_PATH = config.DIST_PATH;

module.exports = function (env) {
    var isProduction = (env === 'production');
    // publicPath
    if (isProduction) {
        var publicPath = config.productionPublicPath;
    } else {
        publicPath = config.developmentPublicPath;
    }
    let r = {
        entry: util.getEntry(JS_DIR + '/entry/*.js'),
        output: {
            path: DIST_PATH,
            publicPath: publicPath,
            filename: '[name].js',
            chunkFilename: 'chunk.[name].js'
        },
        module: {
            rules: util.getRules(env)
        },
        resolve: {
            alias: config.alias,
            extensions: ['.js', '.vue']
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
                context: DIST_PATH,
                manifest: require('./build/dll-manifest.json'),
                name: 'dll'
            })
        ],
        devServer: {
            port: SERVER_PORT,
            historyApiFallback: true,
            noInfo: false,
            contentBase: config.SERVER_DIR
        },
        devtool: '#cheap-module-source-map'
    }
    if (isProduction) {
        r.devtool = '#source-map';

        // http://vue-loader.vuejs.org/en/workflow/production.html
        r.plugins = (r.plugins || []).concat([
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new CleanWebpackPlugin(['dist'], {
                exclude: [
                    'dll.js'
                ]
            })
        ]);
        if (config.cssMinimize) {
            r.plugins.push(new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                // cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: {removeAll: true } },
                canPrint: true
            }));
        }
        if (util.CSSExtracts) {
            r.plugins = r.plugins.concat(util.CSSExtracts);
        }
    }
    return r;
};



