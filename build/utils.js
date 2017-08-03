var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir);
}

exports.getEntries = function () {
    var entries = {};
    glob.sync('./src/modules/**/app.js').forEach(function (path) {
        const chunk = path.split('./src/modules/')[1].split('/app.js')[0];
        entries[chunk] = path;
    });
    return entries;
}

exports.appendPlugins = function (config) {
  var chunks = [];
  glob.sync('./src/modules/**/app.html').forEach(path => {
    const chunk = path.split('./src/modules/')[1].split('/app.html')[0];
    const filename = chunk + '.html';
    chunks.push(chunk);

    const htmlConf = {
      filename: filename,
      template: path,
      inject: 'body',
      favicon: './src/assets/img/logo.png',
      hash: process.env.NODE_ENV === 'production',
      chunks: ['manifest', 'vendor', 'common', chunk],
      chunksSortMode: function (a, b) {
        if (a.parents.length > 0 || b.parents.length > 0) {
          return 1;
        } else {
          return -1;
        }
      }
    };
    config.plugins.push(new HtmlWebpackPlugin(htmlConf));
  })

  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: chunks,
    minChunks: chunks.length
  }));
}
