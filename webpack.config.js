const isProduction = process.env.NODE_ENV === 'production';

const webpackConfig = isProduction ? require('./webpack/webpack.build') : require('./webpack/webpack.dev');

if (process.argv.indexOf('--json') === -1) {
    console.log(' ❤ isProduction:', isProduction, '\n');
}

module.exports = webpackConfig;
