const IgnorePlugin = require('webpack').IgnorePlugin;
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin;

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
                    'less-loader',
                ],
            },
            {test: /\.(png|gif|jpg)$/, loader: 'url-loader?limit=8000&name=images/[hash].[ext]'},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.html$/, loader: 'html-loader'},

            // Font Definitions
            {test: /\.(svg)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]'},
            {test: /\.(woff)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]'},
            {test: /\.(woff2)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]'},
            {test: /\.([ot]tf)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]'},
            {test: /\.(eot)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'},
        ],
    },
    plugins: [
        // We are not using all locales from moment.js only what we need
        new ContextReplacementPlugin(/moment[/\\]locale$/, /en|de|fr|ja/),

        // Ignoring warnings for following plugins, case they doesn't matter
        new IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),
    ],
};
