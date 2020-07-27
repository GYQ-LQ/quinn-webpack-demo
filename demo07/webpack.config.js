const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require("webpack");
module.exports = {
    entry: {
        index: "./src/index.js",
        // index: "./src/index.js",
        // another: "./src/another-module.js",
    },
    plugins: [
        new ManifestPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Code Splitting",
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2,
                },
            },
        },
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};