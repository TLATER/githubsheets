/**
 * Copyright (C) 2019 Tristan Daniël Maat
 *
 * This file is part of gitsheets.
 *
 * gitsheets is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * gitsheets is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gitsheets.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @file Common webpack configuration; the main bundle settings
 * @author Tristan Daniël Maat <tm@tlater.net>
 * @license GPL-3.0-or-later
 * @copyright Tristan Daniël Maat 2019
 */

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
            inlineSource: "(.js|css)$",
            template: "src/templates/index.html",
            // templateParameters: {}
        }),
        new HtmlWebpackInlineSourcePlugin()
    ],
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ["@babel/transform-runtime"]
                        ]
                    }
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /(node_modules|bower_components)/,
                use: "graphql-tag/loader"
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
