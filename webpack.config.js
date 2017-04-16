const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'encosy.js'),

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'engine.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}
