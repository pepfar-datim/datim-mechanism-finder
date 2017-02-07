const webpack = require('webpack');
const path = require('path');
const developmentHeaders = require('./developmentHeaders');

function bypass(req, res, opt) {
    req.headers.Authorization = developmentHeaders.Authorization;
}

const uglifyOptions = {
    mangle: false,
    mangleProps: false,
    sourceMap: true,
};

module.exports = {
    context: __dirname,
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'whereismymech.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                }],
            },
            {
                test: /\.sass$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }],
            },
        ]
    },
    externals: {
        jquery: 'var jQuery',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        process.env.NODE_ENV === 'production' ? new webpack.optimize.UglifyJsPlugin(uglifyOptions) : undefined,
    ].filter(v => v), 
    devtool: 'sourcemap',
    devServer: {
        contentBase: './src/',
        port: 8081,
        inline: true,
        proxy: [
            {
                context: [
                    '/api/**',
                    '/dhis-web-commons/**',
                    '/dhis-web-core-resource/**',
                    '/icons/**',
                    '/css/**',
                    '/images/**',
                ],
                target: 'https://test.datim.org',
                changeOrigin: true,
                bypass,
            },
        ],
    },
};
