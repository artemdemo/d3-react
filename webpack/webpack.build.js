const webpackCommon = require('./webpack.common');

module.exports = Object.assign(webpackCommon, {
    entry: './source/components.js',
    output: {
        path: `${process.cwd()}/`,
        filename: './index.js',
        publicPath: './',
        libraryTarget: 'umd',
    },
    externals: [
        'react',
        'react-dom',
        'react-router',
        'prop-types',
        'classnames',
        'reselect',
        'moment',
        /^lodash\/.+$/,
        /^babel\/.+$/,
        // /^d3-.+$/,
    ],
});
