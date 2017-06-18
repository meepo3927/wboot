var glob = require('glob');
var path = require('path');

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
var getRules = function () {
    var jsRule = {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    };
    var vueRule = {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
            }
        }
    };
    var imgRule = {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
            name: 'img/[name].[ext]?[hash]'
        }
    };
    var fontRule = {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
            name: ('fonts/[name].[hash:7].[ext]')
        }
    };
    var lessRule = {
        test: /\.less$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'postcss-loader'
            },
            {
                loader: 'less-loader'
            }
        ]
    };
    return [jsRule, vueRule, imgRule, fontRule, lessRule];
};

module.exports = {
    getEntry,
    getRules
};