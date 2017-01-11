var webpack = require("webpack");
var glob = require('glob');
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

var nodeLibPath = __dirname + '/node_modules/';
var appSrcPath = __dirname + '/src/';
var appAssetPath = __dirname + '/static/';
var appConfigPath = __dirname;

// swith the prod or dev config, will affect plugin
var isDebug = process.env.NODE_ENV == 'production' ? false : true;
var entries = getEntries('./src/entry/*.js');
entries['vendor'] = ['jquery'];

module.exports = {
    entry: entries,

    output: {
        path: __dirname + '/dist/',
        publicPath: "/",
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/chunk/[name].js'
    },

    performance: {
        hints: isDebug
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules\//,
                loader: 'babel-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'resource/[name].[ext]'
                }
            },
            // Todo: url-loader has a bug, if file length > limit
            // then the file name is not same as prefix rule
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                test: require.resolve('tinymce/tinymce'),
                loaders: [
                    'imports-loader?this=>window',
                    'exports-loader?window.tinymce'
                ]
            },
            {
                test: /tinymce\/(themes|plugins)\//,
                loaders: [
                    'imports-loader?this=>window'
                ]
            }
        ]
    },

    resolve: {
        alias: {
            // src alias
            app_api: appSrcPath + "api/src/api",
            app_lib: appSrcPath + "lib",
            app_component: appSrcPath + "component",
            app_entry: appSrcPath + "entry",
            app_module: appSrcPath + "module",
            app_vuex: appSrcPath + "vuex",

            // other alias
            app_config: appConfigPath,
            app_asset: appAssetPath
        }
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: isDebug,
            minimize: !isDebug,
            options: {
                vue: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            fallbackLoader: 'style-loader',
                            loader: 'css-loader',
                            publicPath: '/'
                        })
                    }
                }
            }
        }),

        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: false,
            allChunks: true
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        }),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'mainfest']
        }),

        new FaviconsWebpackPlugin({
            // Your source logo
            logo: './static/images/icon.png',
            // The prefix for all image files (might be a folder or a name)
            prefix: 'icons-[hash]/',
            // Emit all stats of the generated icons
            emitStats: false,
            // The name of the json containing all favicon information
            statsFilename: 'iconstats-[hash].json',
            // Generate a cache file with control hashes and
            // don't rebuild the favicons until those hashes change
            persistentCache: true,
            // Inject the html into the html-webpack-plugin
            inject: true,
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: '#fff',
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: 'This is a bear, named Owen',

            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        })
    ]
};

(function() {
    // register copy html file plugins
    var entries = getEntries('./src/view/*.html');
    for (var basename in entries) {
        var conf = {
            filename: basename + '.html',
            template: entries[basename],
            inject: false,
            title: 'This is a bear, named Owen'
        };

        module.exports.plugins.push(new HtmlWebpackPlugin(conf));
    }

    // add UglifyJsPlugin
    if (!isDebug) {
        module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: {
                "ascii_only": true
            }
        }));
    }
})();

function getEntries(globPath) {
    var entries = {};
    var basename;
    var tmp;
    var pathname;

    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        entries[basename] = entry;
    });

    return entries;
}
