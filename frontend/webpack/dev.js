const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const AssetsPlugin = require('assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./base')

const config = Object.assign({}, baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, '../../public/assets'), // 出口目录，dist文件
    publicPath: '/assets/',
    filename: '[name].[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].[chunkhash].css"
    }),
    new AssetsPlugin({
      path: path.join(__dirname, '../../public/assets'),
      filename: 'assets.js',
      processOutput: assets => 'window.env="development";window.WEBPACK_ASSETS=' + JSON.stringify(assets)
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ]
})

module.exports = config