const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'index.js',
        publicPath: 'js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            include: [
                path.resolve(__dirname, "src")
            ],
            loader: "babel-loader",
            options: {
                presets: ["es2015"]
            }
        }]
    },
    plugins: [

    ]
}
