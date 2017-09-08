'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: `${__dirname}/views/index.html`,
    filename: 'index.html',
    inject: 'body'
});

const target = 'http://localhost:8080';

module.exports = {
    entry: path.join(__dirname, 'views', 'index.js'),
    devServer: {
        inline: true,
        port: 3000,
        historyApiFallback: true,
        host: 'localhost',
        proxy: {
            '/sign.*?': {
                target,
                bypass: function(req) {
                    return req.method === 'post';
                }
            },
            '/profile': { target },
            '/friend': { target },
            '/dialog': { target },
            '/dialogs': { target },
            '/message': { target }
        }
    },

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

    plugins: [HTMLWebpackPluginConfig]
};