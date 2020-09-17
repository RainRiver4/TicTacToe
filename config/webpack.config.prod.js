const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const settings = {
    mode: "production",
    entry: {
        main: "./src/javascripts/index.js",
    },
    output: {
        filename: "js/[name]-[contenthash:6].js",
        path: path.resolve(__dirname, "..", "build"),
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-[contenthash:6].[ext]",
                            outputPath: "images",
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "templates/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:6].css",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public/images",
                    to: "css/images/[name]-[contenthash:6].[ext]",
                },
            ],
        }),
    ],
};

module.exports = settings;
