module.exports = {
    devServer: {
        publicPath: '/dist/',
        watchContentBase: true,
        allowedHosts: ['.mlb.com', 'localhost', ' 127.0.0.1', '.yesnetwork.com'],
        host: '0.0.0.0',
        public: 'http://localhost:8000',
        watchOptions: {
            aggregateTimeout: 3000,
            poll: 1000,
            ignored: [/node_modules/]
        },
        hot: true,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        stats: {
            all: false,
            chunks: true,
            errors: true,
            warnings: true,
            errorDetails: true,
            modules: false,
            colors: {
                green: '\u001b[32m'
            }
        }
    }
};
