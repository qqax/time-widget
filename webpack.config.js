const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'], // 👈 handles CSS imports
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",   // Вставляет стили в DOM
                    "css-loader",     // Преобразует CSS в CommonJS
                    "sass-loader"     // Компилирует SCSS в CSS
                ]
            }
        ]
    },
    devServer: {
        static: "./dist",
        port: 3000,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html"
        })
    ],
    mode: "development"
};
