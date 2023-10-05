const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const { DefinePlugin } = require("webpack");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");

const mode = "development";

module.exports = {
    mode,
    target: "web",
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        plugins: [
            new TsConfigPathsPlugin({})
        ],
        alias: {
            "vue": "vue/dist/vue.esm-bundler.js",
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.tsx?$|\.jsx?$/,
                include: [
                    path.join(__dirname, '../src'),
                    // path.join(__dirname, '../integrations'),
                ],
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },

            },

            {
                test: /\.css$|\.htm$|\.svg$/,
                include: path.join(__dirname, '../src'),
                loader: 'html-loader'
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'raw-loader',
            //     type: 'javascript/auto'
            // },
        ],
    },
    optimization: {
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'vendors',
        //             chunks: 'all',
        //             filename: '[name].bundle.js',
        //         },
        //     },
        // },
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            name: 'sinkahome',
            template: 'public/index.html',
            chunks: ["main"]
        }),
        new DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
            'process.env': {
                browser: true,
                environment: '"development"'
            }
        }),
    ]
};
