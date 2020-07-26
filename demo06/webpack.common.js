const path = require('path');
// 每次构建之前 清理/dist 目录
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");

// 自动构建生成新的 index.html 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Title from Common.config'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};