var path = require('path')
var webpack = require('webpack');
var glob = require('glob');
var JS_DIR = path.resolve(__dirname, 'js');

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
var alias = {
  // 目录
  lib: JS_DIR + '/lib',
  util: JS_DIR + '/util',
  comp: JS_DIR + '/comp',
  extend: JS_DIR + '/extend',
  global: JS_DIR + '/global',
  pages: JS_DIR + '/pages',
  mixins: JS_DIR + '/mixins',

  // 基础库
  jquery$: 'lib/jquery-2.1.1.min.js',
  vue$: 'lib/vue.min.js',
  velocity$: 'lib/velocity.min.js',

  // 工具,插件
  Promise$: 'lib/promise.js',
  mlayer$: 'lib/mlayer.js',
  autoComplete$: 'extend/jquery.autocomplete.js',
  echarts$: 'lib/echarts.min.js',
  // 通用
  polyfill$: JS_DIR + '/global/polyfill',
  config$: JS_DIR + '/global/config.js',
  root$: JS_DIR + '/root.js'
};
module.exports = {
  entry: getEntry(JS_DIR + '/entry/*.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias
  },
  devServer: {
    port: 8001,
    historyApiFallback: true,
    noInfo: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
