const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./REACT/src/index.jsx",
    mode: "development",
    devServer: {
        static: './REACT/src',
        historyApiFallback: true
    },
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: '/',
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./REACT/src/index.html"
        })
    ]
}