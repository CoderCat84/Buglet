let HtmlWebpackPlugin = require("html-webpack-plugin");
let path = require("path");
let webpack = require("webpack");

module.exports = (env) => {
    return { 
    entry: {
        "app": "main.ts",
        "vendor": "vendor.ts",
        "polyfills": "polyfills.ts"
   },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [ path.resolve(__dirname, "../src/client"), path.resolve(__dirname, "../node_modules")]
    },
    context: path.resolve(__dirname, "../src/client/"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
                    test: /\.ts$/,
                    loaders: ['awesome-typescript-loader', 'angular2-template-loader']
                 },
                {
                    test: /\.html$/,
                    use: "raw-loader",
                }
            ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["polyfills", "vendor"].reverse() 
        }),
    ]
    };
};
