var webpack = require("webpack");
var glob = require('glob');
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var nodeLibPath = __dirname + '/node_modules/';
var appAssetPath = __dirname + '/static/';

module.exports = {
    entry: getEntries('./src/module/**/*.js'),

    output: {
        path: __dirname + '/dist/',
        publicPath:"/dist/",
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
            app: appAssetPath,
            bootstrap: nodeLibPath + "bootstrap",
            jquery: nodeLibPath + "jquery",
            jquery_ui: nodeLibPath + "jquery-ui",
            datatables: nodeLibPath + "datatables",
            datatables_bootstrap: nodeLibPath + "datatables-bootstrap",
            tinymce: nodeLibPath + "tinymce"
        },
        modulesDirectories: ['node_modules', 'src/lib', 'src/api', 'src/vuex']
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
        })
    ],

    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};

(function() {
    var entries = getEntries('./src/module/*/*.html');
    for (var basename in entries) {
        var conf = {
            filename: basename + '.html',
            template: entries[basename],
            inject: false
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
