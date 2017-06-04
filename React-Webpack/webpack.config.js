const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    entry: {
        index: './src/entry/index.js',
        vendor: ['react', 'react-dom', 'react-router', 'react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[name].[hash:8].js',
        publicPath: '',
        chunkFilename: 'js/[id].chunk.[chunkhash:8].js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            include: [
                path.resolve(__dirname, "src")
            ],
            loader: "babel-loader",
            options: {
                presets: [["es2015", {modules: false}], "stage-0", "react"]
            }
        }]
    },
    plugins: [
        new CommonsChunkPlugin({
            name:['vendor'].reverse(),
            minChunks: 2
        }),
        new HtmlWebpackHarddiskPlugin(),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'index.html',
            template: './src/views/index.html', //html模板路径
            chunks: ['vendor', 'index']  // manifest: 可以理解为模块清单，载货单
        })
    ]
}
