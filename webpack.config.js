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

module.exports = {
    entry: getEntries('./src/entry/*.js'),

    output: {
        path: __dirname + '/dist/',
        publicPath: "/",
        filename: 'js/[name].bundle.js',
        chunkFilename: "js/[id].js"
    },

    module: {
        loaders: [
            {
                test: /\.vue$/, // a regex for matching all files that end in `.vue`
                loader: 'vue'   // loader to use for matched files
            },
            {
                test: /\.js$/,
                loader: 'babel-loader', // Enable es6 support by babels
                exclude: /node_modules\//
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: /node_modules\//
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader?name=resource/[name].[ext]'
            },
            // Todo: url-loader has a bug, if file length > limit
            // then the file name is not same as prefix rule
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: require.resolve('tinymce/tinymce'),
                loaders: [
                    'imports?this=>window',
                    'exports?window.tinymce'
                ]
            },
            {
                test: /tinymce\/(themes|plugins)\//,
                loaders: [
                    'imports?this=>window'
                ]
            }
        ]
    },

    vue: {
        loaders: {
            css: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader"
            )
        }
    },

    resolve: {
        alias: {
            // src alias
            app_api: appSrcPath + "api",
            app_lib: appSrcPath + "lib",
            app_component: appSrcPath + "component",
            app_entry: appSrcPath + "entry",
            app_module: appSrcPath + "module",
            app_vuex: appSrcPath + "vuex",

            // other alias
            app_config: appConfigPath,
            app_asset: appAssetPath
        },
        modulesDirectories: ['node_modules']
    },

    plugins: [
        new ExtractTextPlugin("css/[name].css"),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        }),

        new webpack.optimize.CommonsChunkPlugin({
            filename: "js/vendor.bundle.js",
            name: 'vendor'
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
    ],

    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};

(function() {
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
