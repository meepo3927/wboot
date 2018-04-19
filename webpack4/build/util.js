var glob = require('glob');
var path = require('path');
var config = require('./config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var CSSExtract = new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true
});
var vendorExtract = new ExtractTextPlugin({
    filename: 'vendor.css',
    allChunks: true
});

var CSSExtracts = [CSSExtract, vendorExtract];

function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        // pathname = path.join(dirname, basename);
        entries[basename] = entry;
    }
    return entries;
}
var getRules = function (env) {
    var jsRule = {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        type: 'javascript/auto'
    };
    var vueloaders = {};
    var lessloader = [
        'style-loader', 'css-loader',
        'postcss-loader', 'less-loader'
    ];
    var vendorloader = lessloader;
    if (env === 'production') {
        vueloaders.css = CSSExtract.extract([
            'vue-style-loader', 'css-loader',
            'postcss-loader', 'less-loader'
        ]);
        lessloader = CSSExtract.extract([
            'css-loader','postcss-loader','less-loader'
        ]);
        vendorloader = vendorExtract.extract([
            'css-loader','postcss-loader','less-loader'
        ]);
    }
    var vueRule = {
        test: /\.vue$/,
        loader: 'vue-loader',
        type: 'javascript/auto',
        options: {
            loaders: vueloaders
        }
    };
    var imgRule = {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
            name: 'img/[name]_[hash:7].[ext]'
        }
    };
    var fontRule = {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
            name: ('fonts/[name].[hash:7].[ext]')
        }
    };

    var vendorRule = {
        test: /vendor\.less$/,
        use: vendorloader
    };
    var lessRule = {
        test: /entry\.less$/,
        use: lessloader
    };
    return [jsRule, vueRule, imgRule, fontRule, vendorRule, lessRule];
};

module.exports = {
    getEntry,
    getRules,
    CSSExtracts
};