const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
        'babel-polyfill', './server/app.js'
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'server.js'
    },
    target: 'node',
    externals: [ nodeExternals()],
    module: {
        rules: [
            { 
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    browsers: ['ie >= 11', 'Chrome >= 48', 'ff >= 43', 'Safari >= 9.0.3']
                                },
                                useBuiltIns: 'usage',
                                corejs: 3 //,
                                //modules: false
                            }
                        ],
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-syntax-dynamic-import',
                        'babel-plugin-typescript-to-proptypes',
                        'babel-plugin-styled-components'
                    ]
                }
            }
        },
        {
            test: /\.css$/,
            loader: 'css-loader'
        }
    ]}
}