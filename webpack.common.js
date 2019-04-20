const path = require("path");

const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Popper: "popper.js"
        }),
        new HtmlWebpackPlugin({
            inlineSource: "(.js|css)$"
        }),
        new HtmlWebpackInlineSourcePlugin()
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /(node_modules|bower_components)/,
                use: "graphql-tag/loader"
            },
            {
                test: /\.handlebars$/,
                exclude: /(node_modules|bower_components)/,
                use: "handlebars-loader"
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader",
                    options: {
                        plugins: () => [
                            require("precss"),
                            require("autoprefixer")
                        ]
                    }
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    }
};
