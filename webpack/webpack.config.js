import { join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import Webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import CopyPlugin from 'copy-webpack-plugin';
import { VuetifyPlugin } from 'webpack-plugin-vuetify';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mode = 'development';

export default {
    mode,
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        proxy: {
            '/v1/audio/transcriptions': {
                target: {
                    host: '192.168.1.44',
                    protocol: 'http:',
                    port: 8000
                },
            }
        }
    },
    target: 'web',
    entry: {
        main: './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        plugins: [
            new TsConfigPathsPlugin({})
        ],
        alias: {
            vue: path.resolve('./node_modules/vue'),
            '@sinkapoy/home-core': path.resolve('./node_modules/@sinkapoy/home-core'),
            '@sinkapoy/home-integrations-vue-components': path.resolve('./node_modules/@sinkapoy/home-integrations-vue-components'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.tsx?$|\.jsx?$/,
                include: [
                    join(__dirname, '../src'),
                    // path.join(__dirname, '../integrations'),
                ],
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },

            },

            {
                test: /\.css$|\.htm$|\.svg$/,
                include: join(__dirname, '../src'),
                loader: 'html-loader'
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
        new Webpack.ProgressPlugin(),
        new VuetifyPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            name: 'sinkahome',
            template: 'public/index.html',
            chunks: ['main']
        }),
        new Webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false,
            'process.env': {
                browser: true,
                environment: '"development"'
            }
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, './node_modules/@sinkapoy/home-integrations-vue-components/dist/assets/images/'), to: path.resolve(__dirname,'assets/images/'), noErrorOnMissing: true, },
              
            ],
            
        }),
    ]
};
