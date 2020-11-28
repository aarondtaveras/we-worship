module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                targets: {
                    browsers: ['last 2 versions']
                },
                corejs: 3
            }
        ],
        ['@babel/preset-typescript'],
        ['@babel/preset-react']
    ],
    env: {
        production: {
            plugins: [],
            comments: false,
            minified: true
        }
    },
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-styled-components',
        '@babel/transform-runtime'
    ],
    babelrc: false
};