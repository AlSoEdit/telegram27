'use strict';

const webpack = require('webpack');
const path = require('path');
const config = require('config');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: `${__dirname}/views/index.html`,
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: path.join(__dirname, 'views', 'index.js'),
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    'presets': [
                        'react',
                        'stage-2'
                    ]
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'),
    },

    plugins: [
        HTMLWebpackPluginConfig,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.APP_NAME': JSON.stringify(config.APP_NAME),
            'process.env.SOCKET_TYPE': JSON.stringify(config.SOCKET_TYPE)
        })
    ]
};