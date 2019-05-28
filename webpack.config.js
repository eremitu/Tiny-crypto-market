const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './scripts/index.js',
  output: {
    filename: isDev ? 'bundle.js' : 'bundle[hash:4].js',
    path: path.resolve(__dirname, 'public')
  },
  mode: isDev ? "none" : "production",
  devtool: "source-map",
//  watch: "false",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
      ...(isDev ? [] :[new CleanWebpackPlugin()]),
    new HtmlWebpackPlugin({
        template: './index.html',
        filename: './index.html'
    }),
    new CopyWebpackPlugin ([
        { from: './index.css' }
    ])
  ]
};