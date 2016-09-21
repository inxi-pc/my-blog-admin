var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var node_lib_path = __dirname + '/node_modules/';
var app_lib_path = __dirname + '/static/';

module.exports = {
    entry: {
        app: './src/main.js',

        vendor: [
            'jquery',
            'bootstrap',
            'jquery_ui',
            'datatables',
            'datatables_bootstrap',
            'tinymce/tinymce'
        ]
    },

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
            // {
            //     test: /\.css$/,
            //     loader: 'style-loader!css-loader'
            // },
            // Todo: has issue, cant load split css file
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract(
            //         "style-loader",
            //         "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
            //     ),
            //     exclude: /node_modules\//
            // },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract(
            //         "style-loader",
            //         "css-loader?modules&localIdentName=[local]"
            //     ),
            //     include: /node_modules\//
            // },
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
            app: app_lib_path,
            bootstrap: node_lib_path + "bootstrap",
            jquery: node_lib_path + "jquery",
            jquery_ui: node_lib_path + "jquery-ui",
            datatables: node_lib_path + "datatables",
            datatables_bootstrap: node_lib_path + "datatables-bootstrap",
            tinymce: node_lib_path + "tinymce"
        }
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
}
