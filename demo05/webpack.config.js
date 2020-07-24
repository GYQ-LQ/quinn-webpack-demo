const path = require("path");

// 自动构建生成新的 index.html
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 每次构建之前 清理/dist 目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 生成文件 manifest.json 模块映射
// const ManifestPlugin = require("webpack-manifest-plugin");

// devtool: 'inline-source-map'  定位追踪到错误和警告在源代码中的原始位置

const webpack = require("webpack");

module.exports = {
    entry: {
        app: "./src/index.js",
    },
    plugins: [
        // new ManifestPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Title From Config",
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: "./dist",
        hot: true,
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/",
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"],
            },
            {
                test: /\.xml$/,
                use: ["xml-loader"],
            },
            {
                test: /\.(csv|tsv)$/,
                use: ["csv-loader"],
            },
        ],
    },
};