const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommon = require('./webpack.common');


module.exports = Object.assign(webpackCommon, {
    entry: './examples/index.jsx',
    output: {
        publicPath: '/',
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        contentBase: './',
        historyApiFallback: true,
        // proxy,
    },
    devtool: 'source-map',
    plugins: webpackCommon.plugins.concat([
        new HtmlWebpackPlugin({
            template: './examples/index.html',
            filename: './index.html',
        }),

        new CleanWebpackPlugin(['./build'], {
            verbose: true,
            dry: false,
            root: process.cwd(),
            exclude: [
                '.gitignore',
                '.npmignore',
            ],
        }),
    ]),
});
