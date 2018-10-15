const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader",  "sass-loader"]
            }
        ]
    },
    devtool: false,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.SourceMapDevToolPlugin({})
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
};