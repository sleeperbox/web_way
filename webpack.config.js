const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')},
    module:{
        rules:[{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: [
            'styleloader',
            'css-loader'
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader'
            ]
        },
        {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(csv|tsv)$/,
            use: [
            'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
            'xml-loader'
            ]
        }
        ]
    },
    plugins:[
        new HWP(
           {template: path.join(__dirname,'/src/index.html')}
        )
    ]
 }