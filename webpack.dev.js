const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const target = 'http://localhost:8080';

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        inline: true,
        port: 3000,
        historyApiFallback: true,
        host: 'localhost',
        proxy: {
            '/sign.*?': { target },
            '/authState': { target },
            '/profile': { target },
            '/friend': { target },
            '/dialog': { target },
            '/dialogs': { target },
            '/message': { target }
        }
    },
});
