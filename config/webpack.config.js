const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const settings = {
    mode: "development",
    devtool: "eval-source-map",
    entry: {
        main: "./src/javascripts/index.js",
    },
    output: {
        filename: "js/[name]-[contenthash:6].js",
        path: path.resolve(__dirname, "..", "build"),
    },
    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, "public"),
        host: "localhost",
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[name]-[contenthash:6].[ext]",
                    outputPath: "images",
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "templates/index.html",
        }),
    ],
};

module.exports = settings;
