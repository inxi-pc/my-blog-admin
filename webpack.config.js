var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var node_lib_dir = __dirname + '/node_modules/';
var app_lib_dir = __dirname + '/static/';

module.exports = {
    debug: true,

    entry: {
        app: './src/main.js',

        vendor: [
            'jquery',
            'bootstrap',
            'jquery_ui',
            'datatables',
            'datatables_bootstrap'
        ]
    },

    output: {
        path: __dirname + '/build',
        publicPath:"/build",
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
            // // Todo has issue, cant load split css file
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            // {
            //     test: /\.css$/,
            //     loader: 'style-loader!css-loader'
            // },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader?name=resource/[name].[ext]'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },

    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('css'),
            less: ExtractTextPlugin.extract("css!less")
        }
    },

    resolve: {
        alias: {
            app: app_lib_dir,
            bootstrap: node_lib_dir + "bootstrap",
            jquery: node_lib_dir + "jquery",
            jquery_ui: node_lib_dir + "jquery-ui",
            datatables: node_lib_dir + "datatables",
            datatables_bootstrap: node_lib_dir + "datatables-bootstrap"
        }
    },

    plugins: [
        new ExtractTextPlugin("css/app.css"),

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
}
