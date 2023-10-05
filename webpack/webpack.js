const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/index.ts",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".vue"],
        plugins: [new TsConfigPathsPlugin({})],
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
        },
    },
    experiments: {
        outputModule: true,
    },
    output: {
        module: true,

        filename: "index.js",
        path: path.resolve(__dirname, "../dist"),

        library: {
            type: 'module',
        },
    },
    externals: {
        vue: "vue",
        pinia: "pinia"
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, "../src"),
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },

            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new NodePolyfillPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/style/*', to: 'style' },
                { from: './public/*', to: '/'}
            ],
        })
    ],
};
