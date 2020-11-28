const path = require('path');

module.exports = {
    entry: [
        'babel-polyfill', './src/scripts/index.js'
    ],
    output: {
        path: path.join(__dirname, './public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    target: 'node',
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