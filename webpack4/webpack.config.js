var webpack = require('webpack');
var util = require('./build/util');
var config = require('./build/config');

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
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                name: 'commons'
            }
        },
        plugins: [
            new webpack.ProvidePlugin(config.provide),
            new webpack.DllReferencePlugin({
                context: DIST_PATH,
                manifest: require('./build/dll-manifest.json'),
                name: 'dll'
            })
        ],
        devServer: {
            port: SERVER_PORT,
            host: '0.0.0.0',
            historyApiFallback: true,
            noInfo: false,
            disableHostCheck: true,
            contentBase: config.SERVER_DIR
        },
        devtool: false
    }
    if (isProduction) {
        // http://vue-loader.vuejs.org/en/workflow/production.html
        r.plugins = (r.plugins || []).concat([
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ]);
        if (util.CSSExtracts) {
            r.plugins = r.plugins.concat(util.CSSExtracts);
        }
    }
    return r;
};



