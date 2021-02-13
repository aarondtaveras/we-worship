const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
        'babel-polyfill', './server/app.js'
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'server.js',
    },
    target: 'node',
    externals: [ nodeExternals() ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    }
};